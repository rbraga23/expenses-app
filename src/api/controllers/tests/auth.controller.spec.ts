import { AuthController } from '@controllers/auth.controller';
// import { Request, Response } from 'express';

describe('AuthController', () => {
  let controller: AuthController;
  // let response: Response;

  beforeEach(() => {
    controller = new AuthController();
    // response = {
    //   status: jest.fn().mockReturnThis(),
    //   json: jest.fn(),
    // } as unknown as Response;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
