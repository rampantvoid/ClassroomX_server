import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { Faculty } from '@prisma/client';
import { GetDecodedToken } from 'src/auth/decorator';
import { FcSInDto } from 'src/auth/dto';
import { JwtGuard } from 'src/auth/guard';
import { FacultyService } from './faculty.service';

@UseGuards(JwtGuard)
@Controller('faculty')
export class FacultyController {
  constructor(private facultyService: FacultyService) {}

  @Get('me')
  getme(@GetDecodedToken() user: { id: number; email: string }) {
    return this.facultyService.getFC(user);
  }
}
