import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ScriptsModule } from './scripts/scripts.module';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { TrendsModule } from './trends/trends.module';
import { CalendarModule } from './calendar/calendar.module';

@Module({
  imports: [PrismaModule, ScriptsModule, AuthModule, ClientsModule, TrendsModule, CalendarModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
