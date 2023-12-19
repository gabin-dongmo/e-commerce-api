import { Request, Response, Router } from "express";
import { auth } from "../middleware/auth.middleware";
import { LoginUserInput } from "../common/dtos";
import authService from "../services/auth.service";
import * as bcrypt from "bcryptjs";
import { validate } from "../middleware/validate.middleware";
import { validateUser } from "../common/create-user.dto";
import { User } from "../models/user.model";
import _ from "lodash";

const router = Router();

router.post(
  "/",
  validate(validateUser),
  async (req: Request, res: Response) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered.");

    user = new User(
      _.pick(req.body, ["firstName", "lastName", "email", "password", "role"]),
    );
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    res
      .status(201)
      .json(_.pick(user, ["_id", "firstName", "lastName", "email", "role"]));
  },
);

router.post("/login", async (req: Request, res: Response) => {
  const { email, password }: LoginUserInput = req.body;
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
});

router.get("/me", auth, async (req: Request & { user: any }, res: Response) => {
  const user = await authService.findUserById(req.user.id);
  return res.json({ user });
});

export default router;
