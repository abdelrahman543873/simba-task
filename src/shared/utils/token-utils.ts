import { IncomingHttpHeaders } from 'http';

export const getAuthToken = (req: IncomingHttpHeaders): string => {
  if (req.authorization) return req.authorization.split(' ')[1];
  return null;
};
