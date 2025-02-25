import { ForbiddenException, Injectable } from '@nestjs/common';
import { GetDecodedToken } from 'src/auth/decorator';
import { PrismaService } from 'src/prisma/prisma.service';

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
}
