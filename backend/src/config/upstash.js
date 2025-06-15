// import  pkg  from "@upstash/ratelimit";
import  { Ratelimit }  from "@upstash/ratelimit";
import { Redis } from "@upstash/redis"



import dotenv from "dotenv"

dotenv.config();

// const { RateLimit } = pkg
// const {Redis} = redisPkg

// RateLimit: 100 req per minutes
// object of Ratelimt({})
const rateLimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(100, "60 s")
})

export default rateLimit;