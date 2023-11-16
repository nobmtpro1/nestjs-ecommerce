import { Process, Processor } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { Job } from 'bull';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { MailService } from 'src/modules/mail/mail.service';
import { Logger } from 'winston';

@Processor('email')
export class EmailProcessor {
  constructor(
    private readonly mailService: MailService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Process('welcome')
  async sendWelcomeEmail(job: Job<any>) {
    const { user } = job.data;
    await this.mailService.welcome(user);

    this.logger.error('sendWelcomeEmail fail', { user });
    return {};
    // send the welcome email here
  }
}
