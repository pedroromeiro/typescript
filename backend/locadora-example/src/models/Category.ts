import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Movie from "./Movie";

@Entity("category")
export default class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @OneToMany(() => Movie, (movie) => movie.Category)
  movies: Movie[];
}