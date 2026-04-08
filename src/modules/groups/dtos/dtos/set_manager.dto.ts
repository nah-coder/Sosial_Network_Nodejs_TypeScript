import { IsNotEmpty, IsString } from 'class-validator';

export default class SetManagerDto {
  @IsNotEmpty()
  @IsString()
  public userId!: string;

  @IsNotEmpty()
  @IsString()
  public role!: string;
}