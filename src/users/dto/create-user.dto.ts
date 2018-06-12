export class CreateUserDto {
    username: string
    email: string
    password: string
    hash: string
    salt: string
}