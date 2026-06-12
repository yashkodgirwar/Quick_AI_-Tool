import sql from "../configs/db.js"

export const getUserCreation=async (req,res)=>{
    try{
        const {userId}=req.auth()
       const cration= await sql `SELECT * FROM cration WHERE user_id = ${userId} ORDER BY crated_at DESC`
    }catch(error){
        res.json({success:false,message:error.message});
    }
}


export const getPublishedCreation=async (req,res)=>{
    try{
       
       const cration= await sql `SELECT * FROM cration WHERE publish=true ORDER BY crated_at DESC`
    }catch(error){
        res.json({success:false,message:error.message});
    }
}

export const togglelikeCration=async (req,res)=>{
    try{
       const {userId}=req.auth();
       const{id}=req.body //particular creation id

      const [creation] = await sql`SELECT * FROM creations WHERE id = ${id}`

if(!creation){
return res. json({ success: false, message: "Creation not found" })

const currentLikes = creation. likes;
const userIdStr = userId.toString();
let updatedLikes;
let message;

if(currentLikes. includes (userIdStr) ) {
updatedLikes = currentLikes. filter( (user)=> user !== userIdStr);
message = 'Creation Unliked'
}else{
updatedLikes = [ ... currentLikes, userIdStr]
message='Creation Liked'
}
const formattedArray=`{${updatedLikes.join(',')}`

     await sql `UPDATEcreations SET likes =$ {formattedArray}::text[] WHERE id=${id}`

     res.json({success:true,message});
}
    }catch(error){
        res.json({success:false,message:error.message});
    }
}