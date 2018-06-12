import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Image {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    title: string

    @Column()
    alt: string

    @Column()
    filename: string

    @Column()
    original: string

    @Column()
    thumbnail: string
}