import OpenAI from "openai";
import { clerkClient } from "@clerk/express";
import sql from '../configs/db.js'
import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"
import axios from 'axios';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export const generateArticle = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt, length } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if (plan !== 'premium' && free_usage >= 10) {
            return res.json({ success: false, message: "Limit reached. Upgrade to continue ." })
        }

        let lengthConstraint = "";
        let maxTokens = 2000;
        if (length === 800) {
            lengthConstraint = "The article must be detailed and have a word count strictly between 500 and 800 words. Do not make it too short.";
            maxTokens = 1600;
        } else if (length === 1200) {
            lengthConstraint = "The article must be highly detailed and have a word count strictly between 800 and 1200 words. Expand on each section thoroughly to ensure depth.";
            maxTokens = 2400;
        } else if (length === 1600) {
            lengthConstraint = "The article must be extremely detailed, extensive, and have a word count of at least 1200 words (aim for 1200-1500 words). Thoroughly elaborate on all sections and subtopics to reach this length.";
            maxTokens = 3200;
        }

        const fullPrompt = `${prompt}\n\nStrict Instruction: ${lengthConstraint}`;

        const response = await openai.chat.completions.create({
            model: "gemini-2.5-flash",
            messages: [
                {
                    role: "user",
                    content: fullPrompt,
                }
            ],
            temperature: 0.7,
            max_tokens: maxTokens,
        });

        const content = response.choices[0].message.content

        //store the response in data base
        await sql`INSERT INTO creations (user_id,prompt,content,type)
              VALUES (${userId},${prompt},${content}, 'article')`;

        if (plan !== 'premium') {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1
                }
            })
        }
        res.json({ success: true, content })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

export const generateBlogtitle = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt, length } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if (plan !== 'premium' && free_usage >= 10) {
            return res.json({ success: false, message: "Limit reached. Upgrade to continue ." })
        }

        const response = await openai.chat.completions.create({
            model: "gemini-2.5-flash",
            messages: [
                {
                    role: "user",
                    content: prompt,
                }
            ],
            temperature: 0.7,
            max_tokens: length,
        });

        const content = response.choices[0].message.content

        //store the response in data base
        await sql`INSERT INTO creations (user_id,prompt,content,type)
              VALUES (${userId},${prompt},${content}, 'blog-title')`;

        if (plan !== 'premium') {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1
                }
            })
        }
        res.json({ success: true, content })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

export const generateImage = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt, publish } = req.body;
        const plan = req.plan;

        if (plan !== 'premium') {
            return res.json({ success: false, message: "This Feature is only available for premium subscriptions" })
        }

        const formData = new FormData()
        formData.append('prompt', prompt)
        const { data } = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API_KEY,
            },
            responseType: "arraybuffer",
        })
        const base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`
        const { secure_url } = await cloudinary.uploader.upload(base64Image)

        //store the response in data base
        await sql`INSERT INTO creations (user_id,prompt,content,type,publish)
              VALUES (${userId},${prompt},${secure_url}, 'image', ${publish ?? false})`;

        res.json({ success: true, content: secure_url })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

export const removeImageBackground = async (req, res) => {
    try {
        const { userId } = req.auth();
        const image = req.file;
        const plan = req.plan;

        if (plan !== 'premium') {
            return res.json({ success: false, message: "This Feature is only available for premium subscriptions" })
        }

        const { secure_url } = await cloudinary.uploader.upload(image.path, {
            transformation: [
                {
                    effect: 'background_removal',
                    background_removal: 'remove_the_background'
                }
            ]
        })

        //store the response in data base
        await sql`INSERT INTO creations (user_id,prompt,content,type)
              VALUES (${userId},'Remove background from image',${secure_url}, 'image')`;

        res.json({ success: true, content: secure_url })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

export const removeImageObject = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { object } = req.body
        const image = req.file;
        const plan = req.plan;

        if (plan !== 'premium') {
            return res.json({ success: false, message: "This Feature is only available for premium subscriptions" })
        }

        const { public_id } = await cloudinary.uploader.upload(image.path)
        const imageUrl = cloudinary.url(public_id, {
            transformation: [
                {
                    effect: `gen_remove:${object}`
                }
            ],
            resource_type: `image`
        })

        //store the response in data base
        await sql`INSERT INTO creations (user_id,prompt,content,type)
              VALUES (${userId},${`Removed ${object} from image`},${imageUrl}, 'image')`;

        res.json({ success: true, content: imageUrl })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

export const resumeReview = async (req, res) => {
    try {
        const { userId } = req.auth();
        const resume = req.file;
        const plan = req.plan;

        if (plan !== 'premium') {
            return res.json({ success: false, message: "This Feature is only available for premium subscriptions" })
        }

        if (resume.size > 5 * 1024 * 1024) {
            return res.json({ success: false, message: "Resume file size exceeds allowed size (5MB)." })
        }

        const databuffer = fs.readFileSync(resume.path)
        const parser = new pdf.PDFParse({ data: databuffer })
        const pdfData = await parser.getText()

        if (!pdfData.text || pdfData.text.trim().length === 0) {
            return res.json({ success: false, message: "Could not extract text from the uploaded PDF. Please make sure the resume is not a scanned image/PDF." })
        }

        console.log("DEBUG: Extracted PDF Text Length:", pdfData.text.length);
        console.log("DEBUG: Extracted PDF Text Preview:", pdfData.text.substring(0, 200));

        const prompt = `You are an expert technical recruiter and resume reviewer. 
Please review the following resume text and provide a highly detailed, constructive, and comprehensive review.
Break down your feedback into the following sections:
1. **Overall Impression**: A summary of how the resume looks and the first impression it makes.
2. **Strengths**: Specific things that are done well (e.g., impact statements, formatting, skill selection).
3. **Weaknesses**: Areas that need work or are missing.
4. **Actionable Suggestions for Improvement**: Concrete steps the candidate can take to improve the resume (e.g. rewrite specific bullets, add metrics).

Resume Content:
${pdfData.text}`;

        const response = await openai.chat.completions.create({
            model: "gemini-2.5-flash",
            messages: [
                {
                    role: "user",
                    content: prompt,
                }
            ],
            temperature: 0.7,
            max_tokens: 4000,
        });

        const choice = response.choices[0];
        console.log("DEBUG: Full Choice Object:", JSON.stringify(choice, null, 2));

        const content = choice.message?.content;
        if (!content) {
            console.log("DEBUG: No content returned. Finish Reason:", choice.finish_reason);
            return res.json({ success: false, message: `No content returned from AI. Finish Reason: ${choice.finish_reason}` });
        }
        console.log("DEBUG: Gemini Response Length:", content.length);
        console.log("DEBUG: Gemini Response Finish Reason:", choice.finish_reason);

        //store the response in data base
        await sql`INSERT INTO creations (user_id,prompt,content,type)
              VALUES (${userId},'Review the uploaded resume',${content}, 'resume-review')`;

        res.json({ success: true, content })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}