import sql from "../configs/db.js"

export const getUserCreation=async (req,res)=>{
    try{
        const {userId}=req.auth();
        const creations = await sql`SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC`;
        res.json({success:true, creations});
    }catch(error){
        res.json({success:false,message:error.message});
    }
}

export const getPublishedCreation=async (req,res)=>{
    try{
        const creations = await sql`SELECT * FROM creations WHERE publish=true ORDER BY created_at DESC`;
        res.json({success:true, creations});
    }catch(error){
        res.json({success:false,message:error.message});
    }
}

export const togglelikeCration=async (req,res)=>{
    try{
       const {userId}=req.auth();
       const {id}=req.body; // particular creation id

       const [creation] = await sql`SELECT * FROM creations WHERE id = ${id}`;

       if(!creation){
           return res.json({ success: false, message: "Creation not found" });
       }

       const currentLikes = creation.likes || [];
       const userIdStr = userId.toString();
       let updatedLikes;
       let message;

       if(currentLikes.includes(userIdStr)) {
           updatedLikes = currentLikes.filter((user) => user !== userIdStr);
           message = 'Creation Unliked';
       } else {
           updatedLikes = [...currentLikes, userIdStr];
           message = 'Creation Liked';
       }

       await sql`UPDATE creations SET likes = ${updatedLikes} WHERE id = ${id}`;

       res.json({success:true, message});
    }catch(error){
        console.error(error);
        res.json({success:false, message:error.message});
    }
}

export const deleteCreation=async (req,res)=>{
    try{
        const {userId}=req.auth();
        const {id}=req.body;

        if(!id){
            return res.json({success:false, message:"Creation ID is required"});
        }

        const [creation] = await sql`SELECT * FROM creations WHERE id = ${id}`;

        if(!creation){
            return res.json({success:false, message:"Creation not found"});
        }

        if(creation.user_id !== userId){
            return res.json({success:false, message:"Unauthorized to delete this creation"});
        }

        await sql`DELETE FROM creations WHERE id = ${id}`;

        res.json({success:true, message:"Creation deleted successfully"});
    }catch(error){
        console.error(error);
        res.json({success:false, message:error.message});
    }
}

export const sendFeedback=async (req,res)=>{
    try{
        const {userId}=req.auth();
        const {rating, feedback, userName, userEmail} = req.body;

        if(!rating || !feedback){
            return res.json({success:false, message:"Rating and feedback are required"});
        }

        // Ensure table exists
        await sql`
            CREATE TABLE IF NOT EXISTS feedbacks (
                id SERIAL PRIMARY KEY,
                user_id TEXT NOT NULL,
                user_name TEXT,
                user_email TEXT,
                rating INTEGER NOT NULL,
                feedback TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;

        // Insert feedback
        await sql`
            INSERT INTO feedbacks (user_id, user_name, user_email, rating, feedback)
            VALUES (${userId}, ${userName || null}, ${userEmail || null}, ${rating}, ${feedback})
        `;

        res.json({success:true, message:"Feedback submitted successfully! Thank you."});
    }catch(error){
        console.error(error);
        res.json({success:false, message:error.message});
    }
}

export const getFeedbacks=async (req,res)=>{
    try{
        // Ensure table exists
        await sql`
            CREATE TABLE IF NOT EXISTS feedbacks (
                id SERIAL PRIMARY KEY,
                user_id TEXT NOT NULL,
                user_name TEXT,
                user_email TEXT,
                rating INTEGER NOT NULL,
                feedback TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;

        const feedbacks = await sql`
            SELECT * FROM feedbacks 
            ORDER BY created_at DESC 
            LIMIT 15
        `;

        res.json({success:true, feedbacks});
    }catch(error){
        console.error(error);
        res.json({success:false, message:error.message});
    }
}