import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import  Category  from "./Category";
import  Director  from "./Director";
import  UserHasMovie  from "./UserHasMovie";

@Index("FK_movie_category", ["idCategory"], {})
@Index("FK_movie_director", ["idDirector"], {})
@Entity("movie")
export default class Movie {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "id_category" })
  idCategory: number;

  @Column("int", { name: "id_director" })
  idDirector: number;

  @Column("varchar", { name: "picture_url", nullable: true, length: 255 })
  pictureUrl: string | null;

  @Column("varchar", { name: "title", length: 255 })
  title: string;

  @Column("varchar", { name: "description", length: 255 })
  description: string;

  @Column("year", { name: "year" })
  year: number;

  @Column("int", { name: "amount" })
  amount: number;

  @UpdateDateColumn({ name: "updated_at"})
  updatedAt: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @ManyToOne(() => Category, (category) => category.movies, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_category", referencedColumnName: "id" }])
  idCategory2: Category;

  @ManyToOne(() => Director, (director) => director.movies, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_director", referencedColumnName: "id" }])
  idDirector2: Director;

  @OneToMany(() => UserHasMovie, (userHasMovie) => userHasMovie.idMovie2)
  userHasMovies: UserHasMovie[];
}
