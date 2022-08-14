import { IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  avatar: string;

  @IsString()
  @MinLength(5)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{5,}$/, {
    message:
      'Your password must be at least 5 characters including a lowercase letter, an uppercase letter, and a number',
  })
  @IsOptional()
  password: string;
}
