import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Image } from "images/image.entity";

@Entity()
export class Page {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({unique: true})
    slug: string

    @Column()
    title: string

    @Column({ default: '' })
    metaTitle: string

    @Column({ default: '' })
    metaDescription: string

    @ManyToOne(type => Image, { nullable: true })
    image: Image
}