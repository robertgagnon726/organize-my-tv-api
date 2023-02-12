import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Movie } from '../movies/movie.entity';
import { User } from '../users/user.entity';

@Entity()
export class List {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    public id?: number;

    @ManyToOne(() => User, (user) => user.lists)
    @JoinColumn({name: 'accountId'})
    public owner: User;

    @Column()
    @ApiProperty()
    public listName: string;

    @OneToMany(() => Movie, (movie) => movie.list)
    @ApiProperty()
    public movies: Movie[];
}