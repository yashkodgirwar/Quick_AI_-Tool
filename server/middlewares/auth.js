import { clerkClient } from "@clerk/express";


//middleware to check the userId and hasPremiumPlan
export const auth=async(req,res,next)=>{
    try{
        console.log("Auth State:", req.auth);
        const {userId}=req.auth();
        if(!userId){
            return res.status(401).json({success:false, message:"Unauthorized: Missing or invalid token"})
        }
        const user = await clerkClient.users.getUser(userId);
        let hasPremiumPlan = user.publicMetadata?.plan === "premium";

        if (!hasPremiumPlan) {
            try {
                let subscription;
                try {
                    subscription = await clerkClient.billing.getUserBillingSubscription({ userId });
                } catch {
                    subscription = await clerkClient.billing.getUserBillingSubscription(userId);
                }

                if (subscription && (subscription.status === "active" || subscription.status === "trialing")) {
                    hasPremiumPlan = true;
                    // Persist the premium plan to Clerk publicMetadata so the frontend and dashboard reflect it
                    await clerkClient.users.updateUserMetadata(userId, {
                        publicMetadata: {
                            plan: "premium"
                        }
                    });
                }
            } catch (billingError) {
                console.log("Billing Check Error:", billingError.message);
            }
        }

        const free_usage = user.privateMetadata?.free_usage || 0;
        if (!hasPremiumPlan) {
            req.free_usage = free_usage;
        } else {
            // Only update metadata to reset free_usage if it isn't already 0
            if (user.privateMetadata?.free_usage !== 0) {
                await clerkClient.users.updateUserMetadata(userId, {
                    privateMetadata: {
                        free_usage: 0
                    }
                });
            }
            req.free_usage = 0;
        }
        req.plan = hasPremiumPlan ? 'premium' : 'free';
        next()

    }catch(error){
        res.json({success:false, message:error.message})
    }
}