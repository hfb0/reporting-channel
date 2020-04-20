import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TypeOrmErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(err => {
        if (err.code === '23505') {
          //duplicate field
          const key: string = err.detail
            .split('(')[1]
            .match(/[a-zA-Z 0-1]+/g)[0]
            .replace(/^\w/, c => c.toUpperCase());

          throw new ConflictException(`${key} already exists`);
        }
        if (err.code === '23502') {
          throw new BadRequestException();
        }

        throw err;
      }),
    );
  }
}
