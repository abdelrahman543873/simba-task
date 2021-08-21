import request from 'supertest';
import { app } from './before-test-run';
import { HTTP_METHODS_ENUM } from './request.methods.enum';

// done to allow random ordering when entering test request values and eliminate the need to enter num values
interface testRequestInput {
  method: HTTP_METHODS_ENUM;
  url: string;
  variables?: Record<any, any>;
  token?: string;
  fileParam?: string;
  filePath?: string;
  fileParams?: string[];
  headers?: Record<any, any>;
}

export const testRequest = async (
  input: testRequestInput,
): Promise<request.Test> => {
  const server = request(app.getHttpServer());
  let req: request.Test;
  input.method === HTTP_METHODS_ENUM.POST && (req = server.post(input.url));
  input.method === HTTP_METHODS_ENUM.GET && (req = server.get(input.url));
  input.method === HTTP_METHODS_ENUM.PUT && (req = server.put(input.url));
  input.method === HTTP_METHODS_ENUM.DELETE && (req = server.delete(input.url));
  //only way to upload a file and send object values
  input?.variables && input?.filePath
    ? Object.keys(input.variables).forEach((key) => {
        typeof input.variables[key] === 'string'
          ? req.field(key, input.variables[key])
          : req.field(key, `${input.variables[key]}`);
      })
    : input.variables;
  input?.fileParam && input?.filePath
    ? req.attach(input.fileParam, input.filePath)
    : input.fileParams
    ? null
    : req.send(input.variables);
  input?.fileParams
    ? input.fileParams.forEach((param) => {
        req.attach(param, input.filePath);
      })
    : null;
  if (input.token) req.set('Authorization', `Bearer ${input.token}`);
  if (input.headers) {
    if (input.headers.timezone) req.set('timezone', input.headers.timezone);
    if (input.headers.lang) return req.set('lang', input.headers.lang);
    if (input.headers.long) req.set('long', input.headers.long);
    if (input.headers.lat) req.set('lat', input.headers.lat);
  }
  return req;
};
