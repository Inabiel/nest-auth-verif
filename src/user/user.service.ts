import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../util/prisma/prisma.service';
import { PasswordService } from '../util/password/password.service';
import { CreateUserDto } from '../generated/nestjs-dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private passwordService: PasswordService,
    private readonly JwtService: JwtService,
    private mailService: MailerService,
    private configService: ConfigService,
  ) {}

  async createUser(CreateUserDto: CreateUserDto) {
    const hashedPassword = await this.passwordService.hashPassword(
      CreateUserDto.password,
    );

    const checkIfUserIsRegistered = await this.prismaService.user.findUnique({
      where: {
        email: CreateUserDto.email,
      },
    });

    if (checkIfUserIsRegistered) {
      throw new ConflictException('Email has been already registered');
    }

    const createUser = await this.prismaService.user.create({
      data: {
        email: CreateUserDto.email,
        name: CreateUserDto.name,
        password: hashedPassword,
        confirmation_code: this.JwtService.sign(CreateUserDto.email),
      },
    });
    await this.sendVerificationEmail(CreateUserDto.email);
    return { msg: 'user created!', statusCode: 201, data: createUser };
  }

  async sendVerificationEmail(emailAddress: string) {
    const user = await this.prismaService.user.findFirst({
      where: { email: emailAddress },
    });

    const appUrl = this.configService.get('APP_URL');

    const sendEmail = await this.mailService.sendMail({
      to: emailAddress,
      from: 'nizzullah@gmail.com',
      subject: 'test email',
      text: `here is your url to verify your username ${appUrl}/user/verify/${user.confirmation_code}`,
    });
    return !!sendEmail;
  }

  async verifyEmail(confirm_code: string) {
    const getUser = await this.prismaService.user.update({
      where: { confirmation_code: confirm_code },
      data: { verified_at: new Date(Date.now()) },
    });
    return { msg: 'Email Verified Successfully', statusCode: 200 };
  }
}
