import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from './user.request';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(createUserDto: CreateUserDto) {
    // const newUser = this.userRepository.create(createUserDto);
    // await this.userRepository.save(newUser);

    const newUser = this.userRepository.create(createUserDto);
    newUser.password = await bcrypt.hash(createUserDto.password, 10);
    await this.userRepository.save(newUser);

    return { message: 'User registered successfully' };
  }

  // async findByEmail(email: string): Promise<User | undefined> {
  //   return this.userRepository.findOne({ where: { email } });
  // }

  public getUserByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  public getUserByUsername(username: string) {
    return this.userRepository.findOneBy({ username });
  }

  // async findByUsername(username: string): Promise<User | undefined> {
  //   return this.userRepository.findOne({ where: { username } });
  // }

  public getUserById(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  public deleteUser(id: string) {
    console.log('deleteUser', id);
    return this.userRepository.delete({ id });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    const user = await this.userRepository.findOneByOrFail({ id });
    const updatedUser = await this.userRepository.save({
      ...user,
      ...updateUserDto,
    });

    return updatedUser;
  }

  async updatePassword(
    id: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<User | null> {
    const user = await this.userRepository.findOneByOrFail({ id });
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch) {
      throw new Error('Invalid password');
    }
    const updatedUser = await this.userRepository.save({
      ...user,
      password: await bcrypt.hash(newPassword, 10),
    });

    return updatedUser;
  }
}
