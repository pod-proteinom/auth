export interface PasswordService {
    cipher(password: string): Promise<any>;
}