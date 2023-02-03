import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../util/prisma/prisma.module';
import { PasswordModule } from '../util/password/password.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    PrismaModule,
    PasswordModule,
    JwtModule.register({ secret: 'hard!to-guess_secret' }),
  ],
})
export class UserModule {}
