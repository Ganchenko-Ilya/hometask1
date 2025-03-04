import { app } from '../app';
import { agent } from 'supertest';

export const a = agent(app);
describe('', () => {
  it('', () => {
    expect(1).toBe(1);
  });
});
