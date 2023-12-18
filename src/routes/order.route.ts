import { Request, Response, Router } from "express";
import { auth } from "../middleware/auth.middleware";
import { CreateOrderInput } from "../common/dtos";
import { CartModel } from "../domain/models/cart.model";
import { UserModel } from "../domain/models/user.model";
import orderService from "../domain/services/order.service";
import { parseRequest } from "../utils/helpers";
import { OrderUpdateParams } from "../domain/models/order.model";

const router = Router();

router.post("/", auth, async (req: Request, res: Response) => {
  const { status }: CreateOrderInput = req.body;
  const cart = await CartModel.findById({ _id: req.body.cart });
  const user = await UserModel.findById({ _id: req.body.user });
  const createOrder = await orderService.create({
    status,
    cart,
    user,
  });
  user.orders.push(createOrder._id);
  cart.orders.push(createOrder._id);
  await cart.save();
  await createOrder.save();
  return res.json({ order: createOrder });
});

router.get("/", auth, async (req: Request, res: Response) => {
  const orders = await orderService.findAll();
  return res.json({ orders });
});

router.get("/:id", auth, async (req: Request, res: Response) => {
  const order = await orderService.findById(req.params.id);
  return res.json({ order });
});

router.put("/:id", auth, async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = parseRequest(req.body, OrderUpdateParams);
  const updateOrder = await orderService.update(id, data);
  return res.json({ order: updateOrder });
});

router.delete("/:id", auth, async (req: Request, res: Response) => {
  await orderService.deleteById(req.params.id);
  return res.json({ message: "order delete success!!" });
});

export default router;
