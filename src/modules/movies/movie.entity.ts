import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { List } from '../lists/list.entity';

@Entity()
export class Movie {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    public id?: number;

    @Column()
    @ApiProperty()
    public movieName: string;

    @ManyToOne(() => List, (list) => list.movies)
    @JoinColumn({name: 'listId'})
    public list: List;
}