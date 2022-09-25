import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtPayload } from '../shared/interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
    super({
      secretOrKey: '123456',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user: User = await this.userRepository.findOne({
      where: { username }
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
