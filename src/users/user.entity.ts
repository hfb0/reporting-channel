import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { randomBytes } from 'crypto';
import * as argon2 from 'argon2';
import { Denunciation } from 'src/denunciations/denunciation.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, length: 11 })
  cpf: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(
    () => Denunciation,
    denunciation => denunciation.denunciator,
  )
  denunciations: Denunciation[];

  @BeforeInsert()
  // Criptografa senha
  async setPassword() {
    if (this.password) {
      const salt = randomBytes(32);
      const passwordHashed = await argon2.hash(this.password, { salt });

      this.password = passwordHashed;
      this.salt = salt.toString('hex');
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return await argon2.verify(this.password, password);
  }
}
