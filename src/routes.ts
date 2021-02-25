import { Router } from "express";
import checkAuth, { AuthLevel } from "./middlewares/check-auth";
import * as authRepository from "./repositories/auth-repository";

const router = Router();

router.post("/auth/login", authRepository.login);
router.get("/auth", checkAuth([AuthLevel.ADMIN, AuthLevel.USER]).verify, authRepository.get);
router.get("/auth/admin-only", checkAuth([AuthLevel.ADMIN]).verify, authRepository.get);

export default router;
