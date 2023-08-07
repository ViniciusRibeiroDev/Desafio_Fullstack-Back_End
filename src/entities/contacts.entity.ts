import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('contacts')
export class Contact {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 80 })
  nomeCompleto: string;

  @Column({ type: 'varchar', length: 80, nullable: true })
  email: string | null | undefined;

  @Column({ type: 'varchar', length: 25, nullable: true })
  telefone: string;

  @CreateDateColumn()
  dateTime: Date;

  @ManyToOne(() => User, (user) => user.Contact, { onDelete: 'CASCADE' })
  user: User | null;
}
