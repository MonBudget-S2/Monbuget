import { SetMetadata, UseGuards } from "@nestjs/common";
import { AuthenticationGuard } from "./authentication.guard";
import { Role } from "./authentication.enum";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const AuthenticationRequired = () => UseGuards(AuthenticationGuard);

export const HasRole = (role: Role) => SetMetadata("role", role);

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);
