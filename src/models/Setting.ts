import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn
} from "typeorm";

import { v4 as uuid } from "uuid";

@Entity("setting")
export default class Setting {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  user_name: string;

  @Column()
  chat: boolean;

  @UpdateDateColumn()
  updated_at: Date;

  @UpdateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}