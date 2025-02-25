import { Controller, Get, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { GetDecodedToken } from 'src/auth/decorator';
import { Student } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('me')
  getme(@GetDecodedToken() user: { id: number; email: string }) {
    return this.studentService.getST(user);
  }
}
