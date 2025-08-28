const request = require('supertest');
const app = require('../server');
const db = require('../models');

describe('RBAC Tests', () => {
  let adminToken, ownerToken, customerToken;

  beforeAll(async () => {
    // Login sebagai admin
    const adminRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@test.com', password: 'password' });
    adminToken = adminRes.body.token;

    // Login sebagai owner
    const ownerRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'owner@test.com', password: 'password' });
    ownerToken = ownerRes.body.token;

    // Login sebagai customer
    const customerRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'customer@test.com', password: 'password' });
    customerToken = customerRes.body.token;
  });

  describe('Resource Management', () => {
    it('Admin can access all resources', async () => {
      const res = await request(app)
        .get('/api/resources')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).toBe(200);
    });

    it('Owner can only access own resources', async () => {
      const res = await request(app)
        .get('/api/resources')
        .set('Authorization', `Bearer ${ownerToken}`);
      expect(res.status).toBe(200);
      expect(res.body.every(r => r.OwnerId === ownerRes.body.user.id)).toBe(true);
    });

    it('Customer cannot manage resources', async () => {
      const res = await request(app)
        .post('/api/resources')
        .set('Authorization', `Bearer ${customerToken}`)
        .send({ name: 'Test Resource' });
      expect(res.status).toBe(403);
    });
  });
});
