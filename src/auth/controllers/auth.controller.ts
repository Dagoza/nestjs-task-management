import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from '../entities/auth-credentials.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): void {
    this.authService.createUser(authCredentialsDto);
  }
}
