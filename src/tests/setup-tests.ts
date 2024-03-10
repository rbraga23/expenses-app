import { DataSource } from '@database/data-source';

beforeAll(async () => {
  await DataSource.initialize();
});

afterAll(async () => {
  await DataSource.destroy();
});

export const sendEmailMock = jest
  .fn()
  .mockReturnValueOnce({ data: { id: 'mock_id' }, error: null });

jest.mock('resend', () => {
  return {
    Resend: jest.fn().mockImplementation(() => {
      return {
        emails: {
          send: sendEmailMock,
        },
      };
    }),
  };
});
