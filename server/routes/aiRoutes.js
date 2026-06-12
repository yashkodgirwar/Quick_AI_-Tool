import express from "express";
import { auth } from "../middlewares/auth.js";
import { generateArticle, generateBlogtitle, generateImage, removeImageObject, resumeReview } from "../controller/aiController.js";

const aiRouter = express.Router();

aiRouter.post('/generate-article', auth, generateArticle)
aiRouter.post('/generate-blog-title', auth, generateBlogtitle)
aiRouter.post('/generate-image', auth, generateImage)
aiRouter.post('/remove-image-background',upload.single('image'), auth, removeImageBackground)
aiRouter.post('/remove-image-object', upload.single('image'),auth, removeImageObject)
aiRouter.post('/remove-image-object',upload.single('image'), auth, removeImageObject)
aiRouter.post('/review-resume',upload.single('resume'), auth, resumeReview)



export default aiRouter;