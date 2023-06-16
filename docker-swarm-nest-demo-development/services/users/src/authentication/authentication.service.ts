import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginRequest, TokenValidateRequest } from './authentication.request';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JsonWebTokenError } from 'jsonwebtoken';
import { Reflector } from '@nestjs/core';
import { Role } from './authentication.enum';

@Injectable()
export class AuthenticationService {
  public constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(loginRequest: LoginRequest) {
    // const user = await this.usersService.getUserByEmail(loginRequest.email);
    const user = await this.usersService.getUserByUsername(
      loginRequest.username,
    );

    

    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    const isValidPassword = await compare(loginRequest.password, user.password);

    if (!isValidPassword) {
      throw new BadRequestException('Invalid email or password');
    }

    const payload = {
      id: user.id,
    };

    const token = this.jwtService.sign(payload);

    return {
      isConnected: true,
      token,
      id: user.id,
      role: user.role,
      userInfo: {
        username: user.username,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        balance: user.balance,
      },
    };
  }

  public async validateToken(tokenValidateRequest: TokenValidateRequest) {
    if (!tokenValidateRequest.token) {
      throw new BadRequestException('Token is missing');
    }

    try {
      const { id } = this.jwtService.verify(tokenValidateRequest.token);
      const user = await this.usersService.getUserById(id);

      console.log(user);

      if (!user) {
        throw new BadRequestException('Invalid user');
      }

      return {
        isConnected: true,
        id: user.id,
        role: user.role,
        isAdmin: user.role === Role.ADMIN,
        userInfo: {
          username: user.username,
          email: user.email,
          prenom: user.firstname,
          nom: user.lastname,
          balance: user.balance,
        },
      };
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        throw new BadRequestException('Invalid token');
      }

      throw error;
    }
  }
}
