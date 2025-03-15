import { PrimaryGeneratedColumn, Column, Entity, BaseEntity } from "typeorm";

export abstract class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
}

@Entity()
export class User extends BaseModel {
  @Column({ nullable: false })
  email!: string;

  @Column({ nullable: false })
  username!: string;

  @Column({ nullable: false })
  passwordHash!: string;

  @Column({ nullable: false })
  title!: string;

  @Column({ nullable: false })
  firstName!: string;

  @Column({ nullable: false })
  lastName!: string;

  @Column({ nullable: false })
  role!: string;
}
