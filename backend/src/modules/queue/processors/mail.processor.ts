import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailService } from 'src/modules/mail/mail.service';

@Processor('email')
export class EmailProcessor {
  constructor(private readonly mailService: MailService) {}

  @Process('welcome')
  async sendWelcomeEmail(job: Job<any>) {
    const { user } = job.data;
    await this.mailService.welcome(user);

    return {};
    // send the welcome email here
  }
}
