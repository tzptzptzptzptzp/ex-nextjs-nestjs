require('dotenv').config();
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: process.env.TABLE_NAME })
export class POST {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  created_at: string;

  @Column()
  title: string;

  @Column()
  published: number;
}
