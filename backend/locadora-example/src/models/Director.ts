import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Movie from "./Movie";

@Entity("director")
export default class Director {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "fullname", length: 255 })
  fullname: string;

  @UpdateDateColumn({ name: "updated_at"})
  updatedAt: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @OneToMany(() => Movie, (movie) => movie.idDirector2)
  movies: Movie[];
}
