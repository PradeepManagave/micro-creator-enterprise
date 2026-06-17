import { Module } from '@nestjs/common';
import { ScriptsService } from './scripts.service';
import { ScriptsController } from './scripts.controller';
import { PrismaModule } from '../prisma/prisma.module';

import { AiService } from './ai.service';

@Module({
  imports: [PrismaModule],
  controllers: [ScriptsController],
  providers: [ScriptsService, AiService]
})
export class ScriptsModule {}
