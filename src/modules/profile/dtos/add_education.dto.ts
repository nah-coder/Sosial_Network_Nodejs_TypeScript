import { IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';

export default class AddEducationDto {
  @IsNotEmpty()
  @IsString()
  public school: string | undefined;

  @IsNotEmpty()
  @IsString()
  public degree: string | undefined;

  @IsNotEmpty()
  @IsString()
  public fieldofstudy: string | undefined;

  @IsNotEmpty()
  @IsString()
  public from: Date | undefined;

  @IsOptional()
  @IsString()
  public to: Date | undefined;

  @IsOptional()
  @IsBoolean()
  public current: boolean | undefined;

  @IsOptional()
  @IsString()
  public description: string | undefined;
}