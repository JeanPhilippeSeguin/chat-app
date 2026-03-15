import { IsOptional, IsString, IsUUID, Length } from 'class-validator';

export class CreateChannelMessageDto {
  @IsString()
  @Length(0, 255)
  content: string;

  @IsUUID()
  @IsOptional()
  reply: string;
}
