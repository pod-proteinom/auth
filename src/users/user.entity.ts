import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    
    @PrimaryGeneratedColumn("uuid")
    id: string
    
    @Column()
    username: string

    @Column()
    email: string

    @Column()
    hash: string

    @Column()
    salt: string
}