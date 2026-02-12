/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env') });
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Express } from 'express';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let dbConnection: Connection;
  let jwtToken: string;
  let userId: string;
  let circleId: string;
  jest.setTimeout(60000);

  // --- DATOS DE PRUEBA ---
  const mockUser = {
    email: 'test_admin_e2e@example.com',
    password: 'Password123!',
    name: 'Juan E2E',
    birthDate: '1990-01-01',
    timeZone: 'America/New_York',
    nativeLanguages: ['ES'],
    targetLanguages: [{ language: 'EN', level: 'INTERMEDIATE' }],
  };

  const mockCircle = {
    name: 'Spanish-English Exchange E2E',
    type: 'EXCHANGE',
    level: 'intermediate',
    languages: ['es', 'en'],
    requiresMentor: true,
  };

  beforeAll(async () => {
    console.log('---------------------------------------------------');
    console.log('DEBUG: Intentando conectar a DB...');
    console.log('DEBUG: MONGO_URI es:', process.env.DATABASE_URL);
    console.log('---------------------------------------------------');
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

    await app.init();

    dbConnection = app.get(getConnectionToken());
    await dbConnection
      .collection('users')
      .deleteMany({ email: mockUser.email });
    await dbConnection
      .collection('circles')
      .deleteMany({ name: mockCircle.name });
  });

  afterAll(async () => {
    await dbConnection
      .collection('users')
      .deleteMany({ email: mockUser.email });
    if (circleId) {
      // Necesitamos castear a string o usar ObjectId si importas Types
      // Para simplificar en el test, borramos por nombre si es necesario o por ID
      await dbConnection
        .collection('circles')
        .deleteOne({ name: mockCircle.name });
    }
    await app.close();
  });

  // --- ESCENARIOS DEL TEST ---

  // 1. REGISTRO
  it('/auth/register (POST) - should register a new user', async () => {
    const response = await request(app.getHttpServer() as Express)
      .post('/auth/register')
      .send(mockUser)
      .expect(201);

    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('id');
    expect(response.body.user.email).toBe(mockUser.email);
    userId = response.body.user.id;
  });

  // 2. LOGIN (Conseguir la llave)
  it('/auth/login (POST) - should login and return JWT', async () => {
    const response = await request(app.getHttpServer() as Express)
      .post('/auth/login')
      .send({ email: mockUser.email, password: mockUser.password })
      .expect(200);

    expect(response.body).toHaveProperty('access_token');
    jwtToken = response.body.access_token;
  });

  // 3. CREAR CÍRCULO (Protegido + Validación de Lógica de Negocio)
  it('/circles (POST) - should create circle and verify Admin role + Uppercase Transform', async () => {
    const response = await request(app.getHttpServer() as Express)
      .post('/circles')
      .set('Authorization', `Bearer ${jwtToken}`) // Usamos el token del paso anterior
      .send(mockCircle)
      .expect(201);

    expect(response.body.level).toBe('INTERMEDIATE');
    expect(response.body.languages).toEqual(['ES', 'EN']);

    const members = response.body.members;
    expect(members).toHaveLength(1);
    expect(members[0].role).toBe('ADMIN');
    expect(members[0].userId).toBe(userId);

    circleId = response.body._id;
  });

  // 4. VERIFICAR PERFIL (Usuario vinculado al círculo)
  it('/auth/profile (GET) - should show the active exchange circle', async () => {
    const response = await request(app.getHttpServer() as Express)
      .get('/users/profile')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    const user = response.body;

    expect(user).toHaveProperty('activeExchangeId');
    expect(user.activeExchangeId).toBe(circleId);
  });
});
