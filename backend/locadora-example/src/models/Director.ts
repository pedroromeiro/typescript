import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Movie from "./Movie";

@Entity("director")
export default class Director {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @UpdateDateColumn({ name: "updated_at"})
  updatedAt: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @OneToMany(() => Movie, (movie) => movie.idDirector2)
  movies: Movie[];
}
