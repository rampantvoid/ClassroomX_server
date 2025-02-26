import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Faculty } from '@prisma/client';
import { GetDecodedToken } from 'src/auth/decorator';
import { FcSInDto } from 'src/auth/dto';
import { JwtGuard } from 'src/auth/guard';
import { FacultyService } from './faculty.service';
import { CreateClassroomDto } from './dto';

@UseGuards(JwtGuard)
@Controller('faculty')
export class FacultyController {
  constructor(private facultyService: FacultyService) {}

  @Get('me')
  getme(@GetDecodedToken() user: { id: number; email: string }) {
    return this.facultyService.getFC(user);
  }

  @Post('create')
  createClassroom(
    @Body() body: CreateClassroomDto,
    @GetDecodedToken() user: { id: number; email: string },
  ) {
    return this.facultyService.createClassroom(body, user);
  }

  @Get('classrooms')
  getClassrooms(@GetDecodedToken() user: { id: number; email: string }) {
    return this.facultyService.getClassrooms(user);
  }

  @Get('classroom/:id')
  getClassroom(@Param() params: any) {
    return this.facultyService.getClassroom(params);
  }
}
