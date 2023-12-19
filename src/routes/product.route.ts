import { Request, Response, Router } from "express";
import { auth } from "../middleware/auth.middleware";
import productService from "../services/product.service";
import { CreateProductInput } from "../common/dtos";
import { User } from "../models/user.model";
import { parseRequest } from "../utils/helpers";
import { ProductUpdateParams } from "../models/product.model";

const router = Router();
router.post("/", auth, async (req: Request, res: Response) => {
  const { costUnity, name, quantityAvailabe }: CreateProductInput = req.body;
  const user = await User.findById({ _id: req.body.user });
  const createProduct = await productService.create({
    costUnity,
    name,
    quantityAvailabe,
    user,
  });
  user.products.push(createProduct._id);
  await user.save();
  await createProduct.save();
  return res.json({ product: createProduct });
});

router.get("/", async (req: Request, res: Response) => {
  const products = await productService.findAll();
  return res.json({ products });
});

router.get("/:id", auth, async (req: Request, res: Response) => {
  const product = await productService.findById(req.params.id);
  return res.json({ product });
});

router.put("/:id", auth, async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = parseRequest(req.body, ProductUpdateParams);
  const updateProduct = await productService.update(id, data);
  return res.json({ product: updateProduct });
});

router.delete("/:id", auth, async (req: Request, res: Response) => {
  await productService.deleteById(req.params.id);
  return res.json({ message: "Product delete success!!!" });
});

export default router;
