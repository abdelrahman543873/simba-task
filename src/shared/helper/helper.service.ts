import { Injectable } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { UserRepository } from '../../user/user.repository';
import { getAuthToken } from '../utils/token-utils';
import { env } from '../utils/env';
import { IncomingHttpHeaders } from 'http';

@Injectable()
export class HelperService {
  constructor(private userRepo: UserRepository) {}

  async getCurrentUser(req: IncomingHttpHeaders) {
    const token = getAuthToken(req);
    if (!token) return null;
    const { userId } = <{ userId: string }>verify(token, env.JWT_SECRET);
    if (userId) return await this.userRepo.findUserById(userId);
    return null;
  }
}
