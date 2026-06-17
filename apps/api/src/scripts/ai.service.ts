import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private openai: OpenAI | null = null;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (apiKey) {
      this.openai = new OpenAI({ apiKey });
      this.logger.log('OpenAI initialized successfully.');
    } else {
      this.logger.warn('OPENAI_API_KEY missing. Falling back to mock generation.');
    }
  }

  async generateScript(topic: string, platform: string, language: string = 'English'): Promise<any> {
    this.logger.log(`Generating AI script for ${topic} on ${platform} in ${language}`);
    
    if (!this.openai) {
      // Robust Fallback if no key is provided
      await new Promise(resolve => setTimeout(resolve, 2000));
      return {
        content: `[HOOK]\nStop scrolling! If you care about ${topic}, you need to watch this.\n\n[BODY]\nHere are 3 secret strategies for ${platform} that nobody tells you about.\n1. First secret point.\n2. Second important detail.\n3. The ultimate trick.\n\n[CALL TO ACTION]\nDrop a comment if you agree and follow for more!`,
        caption: `Unlocking the secrets of ${topic}! 🚀 What are your thoughts? 👇`,
        hashtags: `#${topic.replace(/\s+/g, '')} #${platform} #Viral`,
      };
    }

    try {
      const prompt = `
        You are an expert viral scriptwriter. Write a highly engaging short-form script for ${platform} about "${topic}".
        Language: ${language}.
        Format the response in JSON with the following schema:
        {
          "content": "The script broken into [HOOK], [BODY], and [CALL TO ACTION]",
          "caption": "A catchy social media caption",
          "hashtags": "3 to 5 relevant hashtags, space separated"
        }
      `;

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
      });

      const result = completion.choices[0].message.content;
      return JSON.parse(result || '{}');
    } catch (err) {
      this.logger.error('OpenAI generation failed', err);
      throw err;
    }
  }
}
