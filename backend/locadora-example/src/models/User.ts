import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import UserHasMovie from "./UserHasMovie";
import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { EncryptionTransformer } from "typeorm-encrypted";

import key from '../config/key.json'; 

@Entity("user")
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({transformer: new EncryptionTransformer({
    key: key.DB_KEY,
      algorithm: 'aes-256-cbc',
      ivLength: 16,
      iv: key.DB_IV
  })})
  name: string;

  @Column({unique: true, transformer: new EncryptionTransformer({
    key: key.DB_KEY,
    algorithm: 'aes-256-cbc',
    ivLength: 16,
    iv: key.DB_IV
  })})
  email: string;


  //a senha será encriptografada e entao salva no banco de dados
  @Column({transformer: new EncryptionTransformer({
    key: key.DB_KEY,
    algorithm: 'aes-256-cbc',
    ivLength: 16,
    iv: key.DB_IV
  })})
  password: string;

  @Column({ name: "is_administrator"})
  isAdministrator: boolean = false

  @UpdateDateColumn({ name: "updated_at"})
  updatedAt: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @OneToMany(() => UserHasMovie, (userHasMovie) => userHasMovie.idUser2)
  userHasMovies: UserHasMovie[];
}
