import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RemoveFieldsInterceptor implements NestInterceptor {
  constructor(private readonly fieldsToRemove: string[]) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map((item) => this.removeFields(item));
        }
        return this.removeFields(data);
      }),
    );
  }

  private removeFields(data: any): any {
    for (const field of this.fieldsToRemove) {
      if (data && data[field]) {
        delete data[field];
      }
    }
    return data;
  }
}
