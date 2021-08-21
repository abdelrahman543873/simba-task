import { Request } from 'express';
import { IncomingHttpHeaders } from 'http';
import { LangEnum } from './app.enum';
import { User } from '../user/models/user.model';

export interface RequestContext {
  currentUser?: User
  appContext: IncomingHttpHeaders;
  lang: LangEnum | string;
}
