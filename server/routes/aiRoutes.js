import express from "express";
import { auth } from "../middlewares/auth.js";
import { generateArticle, generateBlogtitle, generateImage, removeImageBackground, removeImageObject, resumeReview } from "../controller/aiController.js";
import { upload } from "../configs/multer.js";

const aiRouter = express.Router();

aiRouter.post('/generate-article', auth, generateArticle)
aiRouter.post('/generate-blog-title', auth, generateBlogtitle)
aiRouter.post('/generate-image', auth, generateImage)
aiRouter.post('/remove-image-background', auth, upload.single('image'), removeImageBackground)
aiRouter.post('/remove-image-object', auth, upload.single('image'), removeImageObject)
aiRouter.post('/review-resume', auth, upload.single('resume'), resumeReview)



export default aiRouter;