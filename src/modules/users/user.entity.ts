import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { List } from '../lists/list.entity';


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    public accountId?: number;

    @Column({ unique: true })
    @ApiProperty()
    public email: string;

    @Column()
    @ApiProperty()
    public firstName: string;

    @Column()
    @ApiProperty()
    public lastName: string;

    @Column()
    public password: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    public dateCreated: string;

    @OneToMany(() => List, (list) => list.owner)
    @ApiProperty()
    public lists: List[];

    public checkPassword(pass: string) {
        return this.password === pass;
    }
}