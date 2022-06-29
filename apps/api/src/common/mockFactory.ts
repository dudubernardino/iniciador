import { Client } from '../clients/entities/client.entity';
import { Shoe } from '../shoes/entities/shoes.entity';

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

  static getShoe(): Shoe {
    const shoe = new Shoe({
      shoeId: 1,
      brand: 'test',
      color: 'test',
      price: 1,
      size: 1,
    });

    return shoe;
  }
}
