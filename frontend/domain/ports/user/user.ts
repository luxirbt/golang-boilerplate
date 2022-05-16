import AddUserDTO from '../../dto/user/addUserDTO';
import UpdateUserDTO from '../../dto/user/updateUserDTO';
import User from '../../models/user/user';

export default interface UserRepository {
    getAll(): Promise<User[]>;
    save(data: AddUserDTO): Promise<void>;
    updatePassword(id: number, password: string): Promise<void>;
    sendEmail(id: number, email: string): Promise<void>;
    invalidUrl(): Promise<void>;
    updateUser(id: number, data: UpdateUserDTO): Promise<void>;
    get(id: number): Promise<User>;
}
