import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('shoes')
export class Shoe {
  constructor(shoes?: Shoe) {
    this.shoeId = shoes?.shoeId;
    this.brand = shoes?.brand;
    this.price = shoes?.price;
    this.size = shoes?.size;
    this.color = shoes?.color;
  }

  @PrimaryGeneratedColumn({ name: 'shoe_id' })
  shoeId: number;

  @Column()
  brand: string;

  @Column()
  price: number;

  @Column()
  size: number;

  @Column()
  color: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;
}
