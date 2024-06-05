import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ActiveStatus } from '../enums/activeYn';
import { Project } from 'src/project/entity/project.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({ length: 10, nullable: true })
  role: string;

  @Column({
    type: 'enum',
    enum: ActiveStatus,
    default: ActiveStatus.YES,
    nullable: true,
  })
  activeYn: ActiveStatus;

  @OneToMany(() => Project, (project) => project.user, { cascade: true })
  projects: Project[];
}
