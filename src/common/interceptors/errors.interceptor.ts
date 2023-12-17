import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  BadGatewayException,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(catchError((err) => throwError(() => new BadGatewayException())));
  }
}

// https://accounts.google.com/signin/oauth/error/v2?authError=ChVyZWRpcmVjdF91cmlfbWlzbWF0Y2gSwQEK7JWx7J20IEdvb2dsZeydmCBPQXV0aCAyLjAg7KCV7LGF7J2EIOykgOyImO2VmOyngCDslYrquLAg65WM66y47JeQIOyVseyXkCDroZzqt7jsnbjtlaAg7IiYIOyXhuyKteuLiOuLpC4KCuyVsSDqsJzrsJzsnpDrnbzrqbQgR29vZ2xlIENsb3VkIENvbnNvbGXsl5DshJwg66as65SU66CJ7IWYIFVSSeulvCDrk7HroZ3tlZjshLjsmpQuCiAgGm1odHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9pZGVudGl0eS9wcm90b2NvbHMvb2F1dGgyL3dlYi1zZXJ2ZXIjYXV0aG9yaXphdGlvbi1lcnJvcnMtcmVkaXJlY3QtdXJpLW1pc21hdGNoIJADKjcKDHJlZGlyZWN0X3VyaRInaHR0cDovL2xvY2FsaG9zdDozMDAwL29hdXRoL2dvb2dsZS91c2VyMrUCCAESwQEK7JWx7J20IEdvb2dsZeydmCBPQXV0aCAyLjAg7KCV7LGF7J2EIOykgOyImO2VmOyngCDslYrquLAg65WM66y47JeQIOyVseyXkCDroZzqt7jsnbjtlaAg7IiYIOyXhuyKteuLiOuLpC4KCuyVsSDqsJzrsJzsnpDrnbzrqbQgR29vZ2xlIENsb3VkIENvbnNvbGXsl5DshJwg66as65SU66CJ7IWYIFVSSeulvCDrk7HroZ3tlZjshLjsmpQuCiAgGm1odHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9pZGVudGl0eS9wcm90b2NvbHMvb2F1dGgyL3dlYi1zZXJ2ZXIjYXV0aG9yaXphdGlvbi1lcnJvcnMtcmVkaXJlY3QtdXJpLW1pc21hdGNo&client_id=1090094900853-hb013utikpu07s3ejcjoriannimuu1a2.apps.googleusercontent.com
