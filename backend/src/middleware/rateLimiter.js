import rateLimit from "../config/upstash.js"


const RateLimiter = async (req,res,next)=>{
    try {
        // authenticat limit
        // generally "my-rate-limit" will be replaced by userId i.e. per user req if authenticated implemented
        const { success } = await rateLimit.limit("my-rate-limit");

        if(!success) {
            res.status(429).json({
                message: "TOO many request"
            })
        }

        next();
    } catch (error) {
        console.log("Error in RateLimiter", error);
        next(error);
    }
}

export default RateLimiter