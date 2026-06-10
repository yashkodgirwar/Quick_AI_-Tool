import { clerkClient } from "@clerk/express";
import { useId } from "react";

//middleware to check the userId and hasPremiumPlan
export const auth=async(req,res,next)=>{
    try{
        const {userId,has}=await req.auth();
     const hasPremiumPlan = user.publicMetadata?.plan === "premium";
        const user=await clerkClient.user.getUser(userId);
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