import { clerkClient } from "@clerk/express";


//middleware to check the userId and hasPremiumPlan
export const auth=async(req,res,next)=>{
    try{
        console.log("Auth State:", req.auth);
        const {userId}=req.auth;
        if(!userId){
            return res.status(401).json({success:false, message:"Unauthorized: Missing or invalid token"})
        }
        const user=await clerkClient.users.getUser(userId);
        const hasPremiumPlan = user.publicMetadata?.plan === "premium";
        if(!hasPremiumPlan && user.privateMetadata.free_usage){
            req.free_usage=user.privateMetadata.free_usage
        }else{
            await clerkClient.users.updateUserMetadata(userId,{
                privateMetadata:{
                    free_usage:0
                }
            })
            req.free_usage=0;
        }
        req.plan=hasPremiumPlan ? 'premium' : 'free';
        next()

    }catch(error){
        res.json({success:false, message:error.message})
    }
}