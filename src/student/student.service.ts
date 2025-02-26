import { ForbiddenException, Injectable, Param } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { GetDecodedToken } from 'src/auth/decorator';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async getST(@GetDecodedToken() user: { id: number; email: string }) {
    console.log(user);
    try {
      const student = await this.prisma.student.findUnique({
        where: {
          sap: user.id,
        },
        omit: {
          password: true,
        },
      });

      if (!student) throw new ForbiddenException('User Not Found');

      return student;
    } catch (error) {
      console.log(error);
    }
  }

  async getClassrooms(@GetDecodedToken() user: { id: number; email: string }) {
    try {
      const student = await this.prisma.student.findUnique({
        where: { sap: user.id },
      });
      const classrooms = await this.prisma.batchOnClassroom.findMany({
        where: {
          batchId: student?.batchId,
          semester: student?.semester,
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
          sessions: true,
        },
      });

      if (!classroom) throw new Error('Not Found');

      return classroom;
    } catch (error) {
      console.log(error);
    }
  }
}
