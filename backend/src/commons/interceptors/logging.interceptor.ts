import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    console.log(context.switchToHttp().getRequest().query);

    const now = Date.now();
    return next
      .handle()
      .pipe(tap((data) => console.log(`After... ${Date.now() - now}ms`)));
  }
}
