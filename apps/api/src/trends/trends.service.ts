import { Injectable } from '@nestjs/common';

@Injectable()
export class TrendsService {
  getTrends() {
    return [
      { id: 1, topic: 'Pune Real Estate', category: 'Business', growth: '+125%' },
      { id: 2, topic: 'Marathi Rap', category: 'Music', growth: '+85%' },
      { id: 3, topic: 'Street Food Vlogs', category: 'Lifestyle', growth: '+60%' },
      { id: 4, topic: 'Local Startups', category: 'Business', growth: '+45%' },
      { id: 5, topic: 'Navratri Fashion', category: 'Fashion', growth: '+200%' },
    ];
  }
}
