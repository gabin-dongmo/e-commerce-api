import _ from "lodash";
import * as bcrypt from "bcryptjs";
import { Request, Response, Router } from "express";
import { auth } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import authService from "../services/auth.service";
import { validateUserCreation } from "../common/create-user.dto";
import { User } from "../models/user.model";
import { LoginUserDto, validateUserLogin } from "../common/login-user.dto";

const router = Router();

router.post(
  "/",
  validate(validateUserCreation),
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

router.post(
  "/login",
  validate(validateUserLogin),
  async (req: Request, res: Response) => {
    const { email, password } = req.body as LoginUserDto;
    const user = await authService.findByEmail(email);
    if (!user) {
      return res.json({ message: "login failed!" });
    }

    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "login failed!" });
    }

    const token = user.generateAuthToken();

    return res.json({ token });
  },
);

router.get("/me", auth, async (req: Request & { user: any }, res: Response) => {
  const user = await authService.findUserById(req.user.id);
  return res.json(
    _.pick(user, [
      "_id",
      "firstName",
      "lastName",
      "email",
      "role",
      "orders",
      "products",
    ]),
  );
});

export default router;
