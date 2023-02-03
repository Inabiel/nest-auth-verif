export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  confirmation_code?: string;
  verified_at?: Date;
}
