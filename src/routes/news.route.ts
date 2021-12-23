import express from "express";
import { newsController} from "../controllers/news.controller";

const router = express.Router();

router.get('/:section', newsController.getNews);

export default router;

