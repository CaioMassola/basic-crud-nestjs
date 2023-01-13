import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: '30', unique: true })
  username: string;

  @Column({ length: '30', unique: true })
  email: string;

  @Column({ length: '255' })
  password: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
