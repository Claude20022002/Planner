import express from "express";
import { getContraintes, getGabarits, getProfilContraintes, postVerifierContraintes } from "../controllers/moteurContraintesController.js";
import { authenticateToken, requireAdmin, asyncHandler } from "../middleware/index.js";

// Contraintes déclarées par l'école (MOT-13a), réservées à l'administration ; montées sous /api/moteur
const router = express.Router();
router.use(authenticateToken, requireAdmin);

router.get("/gabarits", asyncHandler(getGabarits));
router.get("/contraintes", asyncHandler(getContraintes));
router.get("/contraintes/profil", asyncHandler(getProfilContraintes));
router.post("/contraintes/verifier", asyncHandler(postVerifierContraintes));

export default router;
