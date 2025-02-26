import { Semester } from '@prisma/client';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateClassroomDto {
  @IsString()
  @IsNotEmpty()
  course: string;

  @IsEnum(Semester)
  semester: Semester;

  @IsArray()
  batches: BatchDto[];
}

class BatchDto {
  @IsInt()
  batchId: number;

  @IsEnum(Semester)
  semester: Semester;
}
