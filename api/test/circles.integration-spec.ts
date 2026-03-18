/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env') });
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Express } from 'express';
import cookieParser from 'cookie-parser';

describe('AppController (integration)', () => {
  let app: INestApplication;
  let dbConnection: Connection;
  let jwtToken: string;
  let userId: string;
  let circleId: string;
  jest.setTimeout(60000);

  // --- Test Data ---
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
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    app.use(cookieParser());

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
      await dbConnection
        .collection('circles')
        .deleteOne({ name: mockCircle.name });
    }
    await app.close();
  });

  // ---TEST SCENARIOS ---

  // 1. REGISTER
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

  // 2. LOGIN
  it('/auth/login (POST) - should login and return JWT in a cookie', async () => {
    const response = await request(app.getHttpServer() as Express)
      .post('/auth/login')
      .send({ email: mockUser.email, password: mockUser.password })
      .expect(200);

    const cookies: string[] = response.get('Set-Cookie') || [];

    const authCookie = cookies.find((cookie) =>
      cookie.includes('access_token='),
    );

    if (!authCookie) {
      throw new Error('access_token cookie not found in response headers');
    }
    const tokenValue = authCookie.split(';')[0].split('=')[1];

    jwtToken = tokenValue;

    expect(jwtToken).toBeDefined();
    expect(jwtToken.length).toBeGreaterThan(10);
  });

  // 3. CREATE CIRCLE
  it('/circles (POST) - should create circle and verify Admin role + Uppercase Transform', async () => {
    const response = await request(app.getHttpServer() as Express)
      .post('/circles')
      .set('Cookie', [`access_token=${jwtToken}`])
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

  // 4. VERIFY PROFILE
  it('/auth/profile (GET) - should show the active exchange circle', async () => {
    const response = await request(app.getHttpServer() as Express)
      .get('/users/profile')
      .set('Cookie', [`access_token=${jwtToken}`])
      .expect(200);

    const user = response.body;

    expect(user).toHaveProperty('activeExchangeId');
    expect(user.activeExchangeId).toBe(circleId);
  });

  // // 5. BUSINESS RULE : A USER CAN ONLY HAVE ONE ACTIVE EXCHANGE CIRCLE
  // it('/circles (POST) - should FAIL to create a second Exchange Circle', async () => {
  //   return request(app.getHttpServer() as Express)
  //     .post('/circles')
  //     .set('Authorization', `Bearer ${jwtToken}`)
  //     .send({
  //       ...mockCircle,
  //       name: 'Another Exchange Circle',
  //     })
  //     .expect(400)
  //     .expect((res) => {
  //       expect(res.body.message).toMatch(/already has an active exchange/i);
  //     });
  // });

  // // 6. CONSISTENCY: Verify that the created circle can be retrieved and has correct details
  // it('/circles/:id (GET) - should return the created circle details', async () => {
  //   const response = await request(app.getHttpServer() as Express)
  //     .get(`/circles/${circleId}`)
  //     .set('Authorization', `Bearer ${jwtToken}`)
  //     .expect(200);

  //   expect(response.body.name).toBe(mockCircle.name);
  //   expect(response.body.admin).toBeDefined();
  // });

  // // 7. SECURITY: Verify that unauthenticated requests are rejected
  // it('/circles (POST) - should FAIL without JWT token', async () => {
  //   return request(app.getHttpServer() as Express)
  //     .post('/circles')
  //     .send(mockCircle)
  //     .expect(401);
  // });
});
