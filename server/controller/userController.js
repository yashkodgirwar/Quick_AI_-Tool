import sql from "../configs/db.js"

export const getUserCreations=async (req,res)=>{
    try{
        const {userId}=req.auth()
       const cration= await sql `SELECT * FROM cration WHERE user_id = ${userId} ORDER BY crated_at DESC`
    }catch(error){
        res.json({success:false,message:error.message});
    }
}