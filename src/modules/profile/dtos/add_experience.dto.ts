import { IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';

export default class AddExperienceDto {
  @IsNotEmpty()
  @IsString()
  public title: string | undefined;

  @IsNotEmpty()
  @IsString()
  public company: string | undefined;

  @IsOptional()
  @IsString()
  public location: string | undefined;

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