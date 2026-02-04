/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { Express } from 'express';
import { AppModule } from './../src/app.module';

describe('CirclesController (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;

  const testUser = {
    name: 'E2E Tester',
    email: `e2e-test-${Date.now()}@test.com`,
    password: 'Password123!',
    birthDate: '1995-05-05',
    timeZone: 'America/New_York',
    nativeLanguages: ['ES'],
    targetLanguages: [{ language: 'EN', level: 'INTERMEDIATE' }],
  };

  const validCircle = {
    name: 'Círculo de Testing E2E',
    type: 'PRACTICE',
    level: 'BEGINNER',
    languages: ['EN'],
    requiresMentor: true,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // Validation Pipe global
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

    await app.init();

    // --- LOGIN ---
    // 1. Registrer users
    await request(app.getHttpServer() as Express)
      .post('/auth/register')
      .send(testUser)
      .expect(201);

    // 2. Login user
    const loginResponse = await request(app.getHttpServer() as Express)
      .post('/auth/login')
      .send({ email: testUser.email, password: testUser.password })
      .expect(200);

    jwtToken = (loginResponse.body as { access_token: string }).access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  // --- TESTS DE CIRCLES ---

  describe('POST /circles', () => {
    it('Debería crear un círculo correctamente (201)', async () => {
      const response = await request(app.getHttpServer() as Express)
        .post('/circles')
        .set('Authorization', `Bearer ${jwtToken}`) // <--- La llave maestra 🔑
        .send(validCircle)
        .expect(201);

      // Verificamos que la respuesta tenga datos
      expect(response.body).toHaveProperty('_id');
      expect(response.body.name).toBe(validCircle.name);
      expect(response.body.members).toBeInstanceOf(Array);
    });

    it('Debería fallar si NO estoy logueado (401)', () => {
      return request(app.getHttpServer() as Express)
        .post('/circles')
        .send(validCircle) // Falta el header Authorization
        .expect(401);
    });

    it('Debería fallar si faltan datos requeridos (400)', () => {
      return request(app.getHttpServer() as Express)
        .post('/circles')
        .set('Authorization', `Bearer ${jwtToken}`)
        .send({
          name: 'Círculo Incompleto',
          // Falta type, level, languages...
        })
        .expect(400);
    });
  });

  describe('GET /circles', () => {
    it('Debería listar los círculos (200)', async () => {
      const response = await request(app.getHttpServer() as Express)
        .get('/circles')
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });
});
