import mongoose from "mongoose";
import { Request, Response } from "express";
import { auth } from "../../src/middleware/auth.middleware";
import { UserModel } from "../../src/models/user.model";

interface AuthRequest extends Request {
  header: jest.Mock;
  user: any;
}

describe(`auth middleware`, () => {
  it(`should populate req.user with the payload of a valid JWT`, () => {
    const user = {
      id: new mongoose.Types.ObjectId().toHexString(),
    };
    const token = new UserModel(user).generateAuthToken();
    const req = {
      header: jest.fn().mockReturnValue(token),
    } as AuthRequest;
    const res = {} as Response;
    const next = jest.fn();

    auth(req, res, next);

    expect(req.user).toBeTruthy();
  });
});
