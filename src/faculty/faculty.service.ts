import { Body, ForbiddenException, Injectable, Param } from '@nestjs/common';
import { GetDecodedToken } from 'src/auth/decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClassroomDto } from './dto';

@Injectable()
export class FacultyService {
  constructor(private prisma: PrismaService) {}

  async getFC(@GetDecodedToken() user: { id: number; email: string }) {
    try {
      const faculty = await this.prisma.faculty.findUnique({
        where: {
          employeeID: user.id,
        },
        omit: {
          password: true,
        },
      });

      if (!faculty) throw new ForbiddenException('User Not Found');

      return faculty;
    } catch (error) {
      console.log(error);
    }
  }

  async createClassroom(
    @Body() body: CreateClassroomDto,
    @GetDecodedToken() user: { id: number; email: string },
  ) {
    try {
      const classroom = await this.prisma.classroom.create({
        data: {
          course: body.course,
          semester: body.semester,
          faculty: { connect: { employeeID: user.id } },
          batches: {
            create: body.batches.map((batch) => ({
              batch: {
                connectOrCreate: {
                  where: {
                    semester_batchId: {
                      semester: batch.semester,
                      batchId: batch.batchId,
                    },
                  },
                  create: { semester: batch.semester, batchId: batch.batchId },
                },
              },
            })),
          },
        },
        include: { batches: true },
      });

      if (!classroom) throw new Error('Something went wrong');

      return classroom;
    } catch (error) {
      console.log(error);
    }
  }

  async getClassrooms(@GetDecodedToken() user: { id: number; email: string }) {
    try {
      const classrooms = this.prisma.classroom.findMany({
        where: {
          facultyID: user.id,
        },
        include: {
          batches: true,
        },
      });

      return classrooms;
    } catch (error) {
      console.log(error);
    }
  }

  async getClassroom(@Param() params: any) {
    try {
      const classroom = await this.prisma.classroom.findUnique({
        where: {
          id: Number(params.id),
        },
        include: {
          batches: true,
        },
      });

      if (!classroom) throw new Error('Not Found');
      return classroom;
    } catch (error) {
      console.log(error);
    }
  }
}
