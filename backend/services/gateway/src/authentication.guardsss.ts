// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { RpcException } from '@nestjs/microservices';
// import { Observable } from 'rxjs';
// import { Role } from '../../users/src/authentication/authentication.enum';
// import { AuthenticationRequired } from '../../users/src/authentication/authentication.decorator';

// @Injectable()
// export class AuthenticationGuard implements CanActivate {
//   constructor(private readonly reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
//     const roles = this.reflector.get<Role[]>('roles', context.getHandler());
//     if (!roles) {
//       // No role-based authorization required, proceed with authentication check
//       return this.authenticateRequest(context);
//     }

//     // Role-based authorization is required
//     return this.authorizeRequest(context, roles);
//   }

//   private authenticateRequest(context: ExecutionContext): boolean {
//     const request = context.switchToHttp().getRequest();
//     const isAuthenticated = request.user !== undefined;
//     if (!isAuthenticated) {
//       throw new RpcException('Unauthorized');
//     }
//     return true;
//   }

//   private authorizeRequest(context: ExecutionContext, roles: Role[]): boolean {
//     const request = context.switchToHttp().getRequest();
//     const userRoles: Role[] = request.user?.roles ?? [];
//     const hasValidRole = roles.some((role) => userRoles.includes(role));
//     if (!hasValidRole) {
//       throw new RpcException('Forbidden');
//     }
//     return true;
//   }
// }
