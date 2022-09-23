import {
  ConflictException,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PgCode } from 'src/shared/Enums/pg-code.enum';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from '../entities/auth-credentials.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async createUser(
    authCredentialsDto: AuthCredentialsDto
  ): Promise<void> | never {
    const user = await this.userRepository.create({
      ...authCredentialsDto
    });
    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (error.code === PgCode.DuplicateUniqueColumn) {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
