import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Denunciation } from 'src/denunciations/denunciation.entity';

@Entity()
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'postal_code', nullable: true })
  postalCode: string;

  @Column()
  country: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column({ nullable: true })
  neighborhood: string;

  @Column({ nullable: true })
  street: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(
    () => Denunciation,
    denunciation => denunciation.address,
  )
  denunciations: Denunciation[];
}
