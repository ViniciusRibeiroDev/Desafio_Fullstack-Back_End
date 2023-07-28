import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { getRounds, hashSync } from 'bcryptjs';
import { Contact } from './contacts.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 80 })
  nomeCompleto: string;

  @Column({ unique: true, type: 'varchar', length: 80 })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', length: 25, nullable: true })
  telefone: string | null | undefined;

  @CreateDateColumn()
  dataDeRegistro: Date | string;

  @OneToMany(() => Contact, (contact) => contact.user, { onDelete: 'CASCADE' })
  Contact: Contact[] | null;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const isEncrypted: number = getRounds(this.password);

    if (!isEncrypted) {
      this.password = hashSync(this.password, 10);
    }
  }
}
