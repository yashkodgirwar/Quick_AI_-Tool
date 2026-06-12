import OpenAI from "openai";
import { clerkClient } from "@clerk/express";
import sql from '../configs/db.js'
import { v2 as cloudinary } from 'cloudinary'
import  fs from "fs"
import pdf from "pdf-parse/lib/pdf-parse.js"


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

        const response = await openai.chat.completions.create({
            model: "gemini-3.5-flash",
            messages: [
                {
                    role: "user",
                    content: prompt,
                }
            ],
            temperature: 0.7,
            max_completion_tokens: length,
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
            model: "gemini-2.0-flash",
            messages: [
                {
                    role: "user",
                    content: prompt,
                }
            ],
            temperature: 0.7,
            max_completion_tokens: length,
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
            return res.json({ success: false, message: "This Feature i sonly available for ptrmium subscriptions" })
        }

        const formData = new FormData()
        formData.append('prompt', prompt)
        const { data } = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API_KEY,
            },
            responseType: "arraybuffer",
        }
        )
        const base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`
        const { secure_url } = await cloudinary.uploader.upload(base64Image)
        //store the response in data base
        await sql`INSERT INTO creations (user_id,prompt,content,type,publish)
              VALUES (${userId},${prompt},${secure_url}, 'image', ${publish ?? false})`;

        if (plan !== 'premium') {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1
                }
            })
        }
        res.json({ success: true, secure_url })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

export const removeImageBackground = async (req, res) => {
    try {
        const { userId } = req.auth();
        const  image  = req.file;
        const plan = req.plan;


        if (plan !== 'premium') {
            return res.json({ success: false, message: "This Feature i sonly available for ptrmium subscriptions" })
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
        await sql`INSERT INTO creations (user_id,prompt,content,type,)
              VALUES (${userId},'Remove background from image',${secure_url}, 'image')`;

       
        res.json({ success: true, secure_url })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

export const  removeImageObject = async (req, res) => {
    try {
        const { userId } = req.auth();
        const {object}=req.body
        const image  = req.file;
        const plan = req.plan;


        if (plan !== 'premium') {
            return res.json({ success: false, message: "This Feature i sonly available for ptrmium subscriptions" })
        }

        const { public_id } = await cloudinary.uploader.upload(image.path)
      const imageUrl=  cloudinary.url(public_id,{
            transformation:[
                {
                    effect:`gen_remove:${object}`
                }
            ],
            resource_type:`image`
        })

        //store the response in data base
        await sql`INSERT INTO creations (user_id,prompt,content,type,)
              VALUES (${userId},${`Removed ${object} from  image`},${imageUrl}, 'image')`;

      
        res.json({ success: true, secure_url })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}


export const  resumeReview = async (req, res) => {
    try {
        const { userId } = req.auth();
        const resume = req.file;
        const plan = req.plan;


        if (plan !== 'premium') {
            return res.json({ success: false, message: "This Feature i sonly available for ptrmium subscriptions" })
        }
        
        if(resume.size>5*1024*1024){
            return res.json({success:false,message:"Resume file size exceeds allowed size (5MB)."})

        }
        
        const databuffer=fs.readFileSync(resume.path)
        const pdfData=await pdf(databuffer)


        const prompt = `Review the following resume and provide constructive
feedback on its strengths, weaknesses, and areas for improvement. Resume
Content: \n\n${pdfData.text}`

 const response = await openai.chat.completions.create({
            model: "gemini-3.5-flash",
            messages: [
                {
                    role: "user",
                    content: prompt,
                }
            ],
            temperature: 0.7,
            max_completion_tokens: 1000,
        });

        const content = response.choices[0].message.content

   
        //store the response in data base
        await sql`INSERT INTO creations (user_id,prompt,content,type,)
              VALUES (${userId},'Review the uploaded resume',${content}, 'resume-review')`;

      
        res.json({ success: true, secure_url })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}