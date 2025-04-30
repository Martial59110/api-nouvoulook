import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext('AuthService');
  }

  async validateUser(email: string, password: string): Promise<any> {
    this.logger.info('Validating user credentials');
    const user = await this.usersService.findByEmail(email);
    
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    this.logger.info('Attempting login', { email: loginDto.email });
    const user = await this.validateUser(loginDto.email, loginDto.password);
    
    if (!user) {
      this.logger.warn('Invalid credentials', { email: loginDto.email });
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    this.logger.info('Login successful', { userId: user.id });
    return {
      access_token: accessToken,
      user: {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      },
    };
  }
} 