import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class RcpExceptionsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof HttpException) {
          // Re-throw the existing HttpException as is
          throw error;
        } else if (error.error && error.error.status && error.error.message) {
          // Create a new HttpException with the provided status and message
          throw new HttpException(error.error.message, error.error.status);
        } else {
          // If the error doesn't have a defined status or message, throw a generic internal server error
          throw new HttpException("Internal Server Error", 500);
        }
      })
    );
  }
}
