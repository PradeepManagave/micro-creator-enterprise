import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ScriptsService } from './scripts.service';
import { Prisma } from '@prisma/client';

@Controller('scripts')
export class ScriptsController {
  constructor(private readonly scriptsService: ScriptsService) {}

  @Post()
  async create(@Body() createScriptDto: Prisma.ScriptCreateInput) {
    return this.scriptsService.create(createScriptDto);
  }

  @Get('analytics')
  async getAnalytics() {
    const scripts = await this.scriptsService.findAll();
    return {
      totalScripts: scripts.length,
      estimatedViews: scripts.length * 500,
      engagementRate: 4.8 + (scripts.length * 0.1),
    };
  }

  @Get()
  async findAll() {
    return this.scriptsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.scriptsService.findOne(id);
  }
}
