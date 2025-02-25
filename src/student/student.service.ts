import { ForbiddenException, Injectable } from '@nestjs/common';
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
}
