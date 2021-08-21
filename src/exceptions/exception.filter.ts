import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { BaseHttpException } from './base-http-exception';
import { ExceptionInterface } from './exception.interface';
@Catch(BaseHttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const errorResponse = exception.getResponse() as ExceptionInterface;
    const message = Array.isArray(errorResponse.message)
      ? errorResponse.message[0]
      : errorResponse.message;
    response.send({
      success: false,
      ...errorResponse,
      message,
    });
  }
}
