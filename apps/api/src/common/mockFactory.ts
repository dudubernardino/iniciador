import { Client } from '../clients/entities/client.entity';

export default class MockFacktory {
  static getClient(): Client {
    const client = new Client({
      clientId: 1,
      email: 'test@test.com',
      secret: 'secret',
      hashPassword: () => 'hashedSecret',
    });

    return client;
  }
}
