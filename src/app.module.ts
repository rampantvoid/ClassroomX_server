import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { FacultyService } from './faculty/faculty.service';
import { FacultyModule } from './faculty/faculty.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    FacultyModule,
    StudentModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
