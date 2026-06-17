import { Controller, Get } from '@nestjs/common';
import { TrendsService } from './trends.service';

@Controller('trends')
export class TrendsController {
  constructor(private readonly trendsService: TrendsService) {}

  @Get()
  getTrends() {
    return this.trendsService.getTrends();
  }
}
