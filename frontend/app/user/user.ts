import AddUserDTO from '../../domain/dto/user/addUserDTO';
import UpdateUserDTO from '../../domain/dto/user/updateUserDTO';
import User from '../../domain/models/user/user';
import UserRepository from '../../domain/ports/user/user';

export async function getUsersList(userRepository: UserRepository): Promise<User[]> {
    return await userRepository.getAll();
}

export async function addUser(userRepository: UserRepository, data: AddUserDTO): Promise<void> {
    await userRepository.save(data);
}

export async function updatePassword(userRepository: UserRepository, id: number, password: string): Promise<void> {
    return await userRepository.updatePassword(id, password);
}

export async function sendEmail(userRepository: UserRepository, id: number, email: string): Promise<void> {
    await userRepository.sendEmail(id, email);
}

export async function invalidUrl(userRepository: UserRepository): Promise<void> {
    return await userRepository.invalidUrl();
}

export async function updateUser(userRepository: UserRepository, ID: number, data: UpdateUserDTO): Promise<void> {
    return await userRepository.updateUser(ID, data);
}

export async function getUser(userRepository: UserRepository, id: number): Promise<User> {
    return await userRepository.get(id);
}
