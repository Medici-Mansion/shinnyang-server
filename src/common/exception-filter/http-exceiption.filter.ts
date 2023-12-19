import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const error = exception.getResponse();

    const errorObj = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error,
    };
    //this.handleCustomException(exception);
    this.logger.error(JSON.stringify(errorObj, null, 2), request.url);

    response.status(status).json(errorObj);
  }

  //   private handleCustomException(exception: HttpException) {
  //     if (exception instanceof UnauthorizedException) {
  //
  //     }
  //   }
  // 이 부분을 switch를 사용해서 각 HttpException마다 다르게 핸들링할 수 있지 않을까?
  // BadRequestException
  // UnauthorizedException
  // NotFoundException
  // ForbiddenException
  // ConflictException
}
