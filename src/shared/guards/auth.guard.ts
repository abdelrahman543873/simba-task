import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { BaseHttpException } from '../exceptions/base-http-exception';
import { HelperService } from '../helper/helper.service';
import { RequestContext } from '../request.interface';
import { LangEnum } from '../app.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private helperService: HelperService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestContext>();
    request.appContext = request['headers'];
    const currentUser = await this.helperService.getCurrentUser(
      request.appContext,
    );
    if (!currentUser) throw new BaseHttpException(LangEnum.EN, 602);
    request.currentUser = currentUser;
    return true;
  }
}
