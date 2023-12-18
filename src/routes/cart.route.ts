import { Request, Response, Router } from "express";
import { auth } from "../middleware/auth.middleware";
import { CreateCartInput } from "../common/dtos";
import { ProductModel } from "../domain/models/product.model";
import cartService from "../domain/services/cart.service";
import { parseRequest } from "../utils/helpers";
import { CartUpdateParams } from "../domain/models/cart.model";

const router = Router();

router.post("/", auth, async (req: Request, res: Response) => {
  const { quantity }: CreateCartInput = req.body;
  const product = await ProductModel.findById({ _id: req.body.product });
  const createCart = await cartService.create({
    quantity,
    product,
  });
  product.carts.push(createCart._id);
  await product.save();
  await createCart.save();
  return res.json({ cart: createCart });
});

router.get("/", auth, async (req: Request, res: Response) => {
  const carts = await cartService.findAll();
  return res.json({ carts });
});

router.get("/:id", auth, async (req: Request, res: Response) => {
  const cart = await cartService.findById(req.params.id);
  return res.json({ cart });
});

router.put("/:id", auth, async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = parseRequest(req.body, CartUpdateParams);
  const updateCart = await cartService.update(id, data);
  return res.json({ cart: updateCart });
});

router.delete("/:id", auth, async (req: Request, res: Response) => {
  await cartService.deleteById(req.params.id);
  return res.json({ message: "cart delete success!!!" });
});

export default router;
