import { Router } from "express";
import loginRouter from "./login.js"
import registerRouter from "./register.js"
import itemsRouter from "./items.js"

const router=Router()
router.use(loginRouter)
router.use(registerRouter)
router.use(itemsRouter)


export default router