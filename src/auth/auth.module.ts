import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: '123456',
      signOptions: {
        expiresIn: 3600
      }
    }),
    TypeOrmModule.forFeature([User])
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
