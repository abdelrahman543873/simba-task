import { Request } from 'express';
import { IncomingHttpHeaders } from 'http';
import { LangEnum } from './app.enum';

export interface RequestContext {
  currentUser?: Record<any, any>;
  appContext: IncomingHttpHeaders;
  lang: LangEnum | string;
}
