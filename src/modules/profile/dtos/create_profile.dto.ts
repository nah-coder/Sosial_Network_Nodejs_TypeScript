import { IsNotEmpty, IsOptional } from 'class-validator';

export default class CreateProfileDto {
  @IsOptional()
  public company?: string;

  @IsOptional()
  public location?: string;

  @IsOptional()
  public website?: string;

  @IsOptional()
  public bio?: string;

  @IsOptional()
  public skills?: string | string[];

  @IsOptional()
  public status?: string;

  @IsOptional()
  public youtube?: string;

  @IsOptional()
  public twitter?: string;

  @IsOptional()
  public instagram?: string;

  @IsOptional()
  public linkedin?: string;

  @IsOptional()
  public facebook?: string;
}
