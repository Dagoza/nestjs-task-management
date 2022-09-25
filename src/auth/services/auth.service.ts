import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PgCode } from 'src/shared/enums/pg-code.enum';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from '../entities/auth-credentials.dto';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/shared/interfaces/jwt-payload.interface';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async createUser({
    username,
    password
  }: AuthCredentialsDto): Promise<void> | never {
    //hash
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.userRepository.create({
      username,
      password: hashedPassword
    });
    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (error.code === PgCode.DuplicateUniqueColumn) {
        throw new ConflictException('Username already exists');
      }
      throw new InternalServerErrorException();
    }
  }

  async signIn({
    username,
    password
  }: AuthCredentialsDto): Promise<Record<'accessToken', string>> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    }
    throw new UnauthorizedException('Please check you login credentials');
  }
}
