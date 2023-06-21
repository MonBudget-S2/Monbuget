import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Reflector } from "@nestjs/core";
import { JsonWebTokenError } from "jsonwebtoken";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

interface CustomRequest extends Request {
  user: any;
}
@Injectable()
export class AuthenticationGuard implements CanActivate {
  public constructor(
    private readonly jwtService: JwtService,
    @Inject("USER_SERVICE") private readonly usersService: ClientProxy,

    private reflector: Reflector
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    // const request = context.switchToHttp().getRequest<Request>();
    const request = context.switchToHttp().getRequest<CustomRequest>();

    Logger.log(request.headers);
    const authorizationHeader = request.get("Authorization");

    if (!authorizationHeader) {
      throw new BadRequestException("Authorization header is missing");
    }

    const [authorizationType, token] = authorizationHeader.split(" ");

    if (authorizationType !== "Bearer") {
      throw new BadRequestException("Authorization type should be Bearer");
    }

    if (!token) {
      throw new BadRequestException("Token is missing");
    }

    try {
      const role = this.reflector.get<string | undefined>(
        "role",
        context.getHandler()
      );
      const { id } = this.jwtService.verify(token);
      const user = await firstValueFrom(
        this.usersService.send({ service: "user", cmd: "getUserById" }, id)
      );

      console.log(user);
      if (!user) {
        throw new BadRequestException("Invalid user");
      }

      if (role && user.role !== role) {
        throw new BadRequestException("Invalid role");
      }

      delete user?.password;
      request.user = user;

      return true;
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        throw new BadRequestException("Invalid token");
      }

      throw error;
    }
  }
}
