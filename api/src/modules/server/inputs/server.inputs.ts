import { IsUUID } from 'class-validator';

export class GetServerProfileDto {
  @IsUUID()
  id: string;
}
