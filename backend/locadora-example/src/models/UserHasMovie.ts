import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Movie from "./Movie";
import User from "./User";

@Index("FK_user_movie", ["idUser"], {})
@Index("FK_movie_user", ["idMovie"], {})
@Entity("user_has_movie")
export default class UserHasMovie {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "id_movie" })
  idMovie: number;

  @Column("int", { name: "id_user" })
  idUser: number;

  @Column("tinyint", { name: "returned", nullable: true, default: () => "'0'" })
  returned: number | null;

  @Column("timestamp", { name: "rented_at", default: () => "now()" })
  rentedAt: Date;

  @Column("timestamp", { name: "returned_at", default: () => "now()", nullable: true })
  returnedAt: Date | null;

  @ManyToOne(() => Movie, (movie) => movie.userHasMovies, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_movie", referencedColumnName: "id" }])
  idMovie2: Movie;

  @ManyToOne(() => User, (user) => user.userHasMovies, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_user", referencedColumnName: "id" }])
  idUser2: User;
}
