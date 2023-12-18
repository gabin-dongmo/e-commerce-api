import { Request, Response, Router } from "express";
import { auth } from "../middleware/auth.middleware";
import productService from "../domain/services/product.service";
import { CreateProductInput } from "../common/dtos";
import { UserModel } from "../domain/models/user.model";
import { parseRequest } from "../utils/helpers";
import { ProductUpdateParams } from "../domain/models/product.model";

const router = Router();
router.post("/", auth, async (req: Request, res: Response) => {
  const { costUnity, name, quantityAvailabe }: CreateProductInput = req.body;
  try {
    const user = await UserModel.findById({ _id: req.body.user });
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
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const products = await productService.findAll();
    return res.json({ products });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/:id", auth, async (req: Request, res: Response) => {
  try {
    const product = await productService.findById(req.params.id);
    return res.json({ product });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.put("/:id", auth, async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = parseRequest(req.body, ProductUpdateParams);
  try {
    const updateProduct = await productService.update(id, data);
    return res.json({ product: updateProduct });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.delete("/:id", auth, async (req: Request, res: Response) => {
  try {
    await productService.deleteById(req.params.id);
    return res.json({ message: "Product delete success!!!" });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

export default router;
