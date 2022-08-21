import { IsString } from 'class-validator';

export class DiarySendChangesDto {
  @IsString()
  document: string;

  @IsString()
  ident: string;
}
