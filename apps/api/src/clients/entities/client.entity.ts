import { hashSync } from 'bcrypt';

import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('clients')
export class Client {
  constructor(client?: Client) {
    this.clientId = client?.clientId;
    this.email = client?.email;
    this.secret = client?.secret;
    this.hashPassword = client?.hashPassword;
  }

  @PrimaryGeneratedColumn({ name: 'client_id' })
  clientId: number;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'client_secret', type: 'varchar' })
  secret: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @BeforeInsert()
  hashPassword() {
    this.secret = hashSync(this.secret, 10);
  }
}
