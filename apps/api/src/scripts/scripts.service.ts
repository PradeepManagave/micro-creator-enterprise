import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Script } from '@prisma/client';
import { AiService } from './ai.service';

@Injectable()
export class ScriptsService {
  constructor(private prisma: PrismaService, private aiService: AiService) {}

  async create(data: Prisma.ScriptCreateInput & { language?: string; clientId?: string }): Promise<Script> {
    // Call AI to generate content if not provided
    if (!data.content) {
      const generated = await this.aiService.generateScript(
        data.topic, 
        data.platforms || 'Instagram', 
        data.language || 'English'
      );
      
      data.content = generated.content;
      data.caption = generated.caption;
      data.hashtags = generated.hashtags;
    }

    return this.prisma.script.create({ data: {
      topic: data.topic,
      content: data.content,
      caption: data.caption,
      hashtags: data.hashtags,
      platforms: data.platforms,
      status: 'READY',
      ...(data.clientId && { client: { connect: { id: data.clientId } } })
    }});
  }

  async findAll(): Promise<Script[]> {
    return this.prisma.script.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async findOne(id: string): Promise<Script | null> {
    return this.prisma.script.findUnique({
      where: { id }
    });
  }
}
