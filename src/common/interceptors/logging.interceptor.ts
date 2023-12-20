import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { EmojiLogger } from '../emoji.logger';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private logger: EmojiLogger) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // console.log('context -------', context);
    const { method, url } = context.getArgByIndex(0);
    this.logger.log(`Request to ${method} ${url}`);

    return next
      .handle()
      .pipe(
        tap((data) =>
          this.logger.log(
            `Response from ${method} ${url} \n response: ${JSON.stringify(
              data,
            )}`,
          ),
        ),
      );
  }
}
