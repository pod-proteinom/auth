export interface PasswordService {

    cipher(password: string): Promise<any>;

    verify(password: string, salt: string, correctHash: string): Promise<boolean>;
}