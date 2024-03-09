import { Resend } from 'resend';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export class EmailService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async send({ to, subject, html }: EmailOptions) {
    return await this.resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to,
      subject,
      html: html,
    });
  }
}
