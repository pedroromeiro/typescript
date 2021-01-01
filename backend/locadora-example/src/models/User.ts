import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import UserHasMovie from "./UserHasMovie";
import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { EncryptionTransformer } from "typeorm-encrypted";

import key from '../config/key.json'; 

@Entity("user")
export default class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length:255, transformer: new EncryptionTransformer({
    key: key.DB_KEY,
      algorithm: 'aes-256-cbc',
      ivLength: 16,
      iv: key.DB_IV
  })})
  @MinLength(2, {message: "O nome deve conter no mínimo 2 caracteres."})
  @MaxLength(255, {message: "O nome deve conter no máximo 255 caracteres."})
  name: string;

  @Column("varchar", { unique: true, name: "email", length:255, transformer: new EncryptionTransformer({
    key: key.DB_KEY,
    algorithm: 'aes-256-cbc',
    ivLength: 16,
    iv: key.DB_IV
  })})
  @IsEmail({},{message:"E-mail inválido"})
  email: number;

  @MinLength(5, {message: "A senha deve conter no mínimo 5 caracteres."})
  @MaxLength(16, {message: "A senha deve conter no máximo 16 caracteres."})

  //a senha será encriptografada e entao salva no banco de dados
  @Column("varchar", { name: "password", length:255,
  transformer: new EncryptionTransformer({
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
