import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductTag } from 'src/entities/product-tag.entity';
import { User } from 'src/entities/user.entity';
import { Permission } from './permission.enum';

@Injectable()
export class AuthorizationService {
  async can(user: User, permission: Permission[]) {}
}
