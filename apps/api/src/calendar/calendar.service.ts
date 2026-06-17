import { Injectable } from '@nestjs/common';

@Injectable()
export class CalendarService {
  getCalendar() {
    return [
      { id: 1, title: '5 Real Estate Tips', date: '2026-06-18', time: '10:00 AM', platform: 'Instagram' },
      { id: 2, title: 'Pune Startup Interview', date: '2026-06-19', time: '02:00 PM', platform: 'YouTube' },
      { id: 3, title: 'Navratri Outfits', date: '2026-06-20', time: '06:00 PM', platform: 'Instagram' },
    ];
  }
}
