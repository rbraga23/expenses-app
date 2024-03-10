import { EmailService, EmailOptions } from '@services/email.service';
import { sendEmailMock } from '@tests/setup-tests';

const emailOptions: EmailOptions = {
  to: 'teste@teste.com',
  subject: 'Test email',
  html: '<p>Test email</p>',
};

describe('EmailService - send email', () => {
  let emailService: EmailService;

  beforeEach(() => {
    emailService = new EmailService();
    sendEmailMock.mockClear();
  });

  it('should send an email', async () => {
    const result = await emailService.send(emailOptions);

    expect(result).toEqual({ id: 'mock_id' });
  });

  it('should throw an error when the email fails', async () => {
    sendEmailMock.mockReturnValueOnce({
      data: null,
      error: { message: 'Error sending email' },
    });

    await expect(emailService.send(emailOptions)).rejects.toThrow(
      'Error sending email',
    );
  });
});
