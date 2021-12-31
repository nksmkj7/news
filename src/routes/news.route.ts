import express from "express";
import { newsController } from "../controllers/news.controller";
import nextFnWrapper from '../middlewares/nextFn-wrapper';

const router = express.Router();

router.get('/:section', nextFnWrapper(newsController.getNews));

export default router;

