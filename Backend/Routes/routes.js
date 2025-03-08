import { Router } from "express";
import loginRouter from "./Auth/login.js"
import registerRouter from "./Auth/register.js"
import itemsRouter from "./items.js"
import productRouter from "./Products/products.js"

const router=Router()
router.use(loginRouter)
router.use(registerRouter)
router.use(itemsRouter)
router.use(productRouter)


export default router