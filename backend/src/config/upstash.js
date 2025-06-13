// import  pkg  from "@upstash/ratelimit";
import  { Ratelimit }  from "@upstash/ratelimit";
import { Redis } from "@upstash/redis"



import dotenv from "dotenv"

dotenv.config();

// const { RateLimit } = pkg
// const {Redis} = redisPkg

// RateLimit: 5 req for 10 sec
// object of Ratelimt({})
const rateLimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, "10 s")
})

export default rateLimit;