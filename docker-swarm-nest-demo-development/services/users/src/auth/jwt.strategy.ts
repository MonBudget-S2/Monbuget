import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your-secret-key', // Replace with your own secret key
    });
  }

  async validate(payload: any): Promise<User> {
    const user = await this.authService.validateUser(payload.email, null);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
