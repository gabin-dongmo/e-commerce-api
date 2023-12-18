import { Request, Response, Router } from "express";
import { auth } from "../shared/core/middleware/auth";
import { CreateUserInput, LoginUserInput } from "../shared/types/models";
import authService from "../domain/services/auth.service";
import * as bcrypt from "bcryptjs";

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  const { email, fullname, role }: CreateUserInput = req.body;
  try {
    const password: string = bcrypt.hashSync(req.body.password, 10);
    const createUser = await authService.registerService({
      email,
      fullname,
      password,
      role,
    });

    return res.status(200).json({ user: createUser });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  const { email, password }: LoginUserInput = req.body;
  try {
    const user = await authService.findByEmail(email);
    if (!user) {
      return res.json({ message: "login failed!" });
    }
    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "login failed!" });
    }
    const token = user.generateAuthToken();
    return res.json({ user, token });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get('/me', auth, async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const jsonPayload = JSON.parse(
    Buffer.from(token.split(".")[1], "base64").toString(),
  );
  try {
    const user = await authService.findUserById(jsonPayload.id);
    return res.json({ user });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

export default router;
