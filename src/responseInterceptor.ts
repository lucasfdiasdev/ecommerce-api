import { Observable, map } from 'rxjs';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';

export interface Response<T> {
  message: string;
  success: boolean;
  result: any;
  error: null;
  timestamp: Date;
  statusCode: number;
}

// interceptor global
export class TransformationInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<Response<T>> {
    const statusCode = context.switchToHttp().getResponse().getStatusCode();
    const path = context.switchToHttp().getRequest().url;

    return next.handle().pipe(
      map((data) => ({
        message: data.message,
        success: data.success,
        result: data.result,
        timestamp: new Date(),
        statusCode,
        path,
        error: null,
      })),
    );
  }
}
