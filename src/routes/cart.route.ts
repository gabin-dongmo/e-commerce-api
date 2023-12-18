import { Request, Response, Router } from "express";
import { auth } from "../shared/core/middleware/auth";
import { CreateCartInput } from "../shared/types/models";
import { ProductModel } from "../domain/models/product.model";
import cartService from "../domain/services/cart.service";
import { parseRequest } from "../utils/helpers";
import { CartUpdateParams } from "../domain/models/cart.model";

const router = Router();

router.post("/", auth, async (req: Request, res: Response) => {
  const { quantity }: CreateCartInput = req.body;
  try {
    const product = await ProductModel.findById({ _id: req.body.product });
    const createCart = await cartService.create({
      quantity,
      product,
    });
    product.carts.push(createCart._id);
    await product.save();
    await createCart.save();
    return res.json({ cart: createCart });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/", auth, async (req: Request, res: Response) => {
  try {
    const carts = await cartService.findAll();
    return res.json({ carts });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/:id", auth, async (req: Request, res: Response) => {
  try {
    const cart = await cartService.findById(req.params.id);
    return res.json({ cart });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.put("/:id", auth, async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = parseRequest(req.body, CartUpdateParams);
  try {
    const updateCart = await cartService.update(id, data);
    return res.json({ cart: updateCart });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.delete("/:id", auth, async (req: Request, res: Response) => {
  try {
    await cartService.deleteById(req.params.id);
    return res.json({ message: "cart delete success!!!" });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

export default router;
