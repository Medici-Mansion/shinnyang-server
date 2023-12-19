import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Response } from 'express';

@Catch(QueryFailedError)
export class TransactionExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(TransactionExceptionFilter.name);
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const QueryErrorObj = {
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: 'Transaction Error',
      error: exception.message,
    };
    this.logger.error(JSON.stringify(QueryErrorObj, null, 2), request.url);
    response.status(500).json(QueryErrorObj);
  }
}
