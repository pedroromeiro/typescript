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
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "id_category" })
  idCategory: number;

  @Column({ name: "id_director" })
  idDirector: number;

  @Column({ name: "picture_url", nullable: true})
  pictureUrl: string;

  @Column()
  title: string;

  @Column({type: "varchar", length:1000})
  description: string;

  @Column()
  year: number;

  @Column()
  amount: number;
  //quantidade de títulos disponíveis para alugar

  @UpdateDateColumn({ name: "updated_at"})
  updatedAt: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @ManyToOne(() => Category, (category) => category.movies, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_category", referencedColumnName: "id" }])
  Category: Category;

  @ManyToOne(() => Director, (director) => director.movies, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_director", referencedColumnName: "id" }])
  Director: Director;

  @OneToMany(() => UserHasMovie, (userHasMovie) => userHasMovie.Movie)
  userHasMovies: UserHasMovie[];
}
