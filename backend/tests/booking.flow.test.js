const request = require('supertest');
const app = require('../server');
const db = require('../models');

describe('Booking Flow Test', () => {
  let token, resourceId;

  beforeAll(async () => {
    // Create test user and get token
    const user = await db.User.create({
      Fullname: 'Test User',
      Email: 'test@example.com',
      Password: 'password123',
      RoleId: 3 // customer role
    });

    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });

    token = loginResponse.body.token;
  });

  test('Can view available resources', async () => {
    const response = await request(app)
      .get('/api/resources/available')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
});


  test('1. Customer can view available resources', async () => {
    const res = await request(app)
      .get('/api/resources/available')
      .set('Authorization', `Bearer ${customerToken}`);
    
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  test('2. Customer can create booking', async () => {
    // Create resource first
    const resource = await db.Resource.create({
      Name: 'Test Room',
      BookingType: 'Room',
      ResourceType: 'Meeting',
      Description: 'Test Description',
      IsActive: true,
      OwnerId: ownerId
    });
    resourceId = resource.UniqueID;

    const bookingData = {
      ResourceId: resourceId,
      StartTime: new Date(Date.now() + 86400000), // tomorrow
      EndTime: new Date(Date.now() + 90000000),
    };

    const res = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${customerToken}`)
      .send(bookingData);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('BookingCode');
    bookingId = res.body.UniqueID;
  });

  test('3. Customer can view booking details', async () => {
    const res = await request(app)
      .get(`/api/bookings/${bookingId}`)
      .set('Authorization', `Bearer ${customerToken}`);

    expect(res.status).toBe(200);
    expect(res.body.UniqueID).toBe(bookingId);
  });

  test('4. Customer can check-in', async () => {
    const res = await request(app)
      .post(`/api/bookings/${bookingId}/checkin`)
      .set('Authorization', `Bearer ${customerToken}`);

    expect(res.status).toBe(200);
    expect(res.body.Status).toBe('CheckedIn');
  });

  test('5. Customer can check-out', async () => {
    const res = await request(app)
      .post(`/api/bookings/${bookingId}/checkout`)
      .set('Authorization', `Bearer ${customerToken}`);

    expect(res.status).toBe(200);
    expect(res.body.Status).toBe('Completed');
  });

  afterAll(async () => {
    await db.sequelize.close();
  });
});
