import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';

@Injectable()
export class MailService {
  constructor(@Inject(MailerService) private mailerService: MailerService) {}

  async welcome(user: User) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Nestjs Ecommerce!',
      template: 'welcome',
      context: {
        // ✏️ filling curly brackets with content
      },
    });

    return true;
  }
}
