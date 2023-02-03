export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  confirmation_code: string | null;
  verified_at: Date | null;
  created_at: Date;
  updated_at: Date;
}
