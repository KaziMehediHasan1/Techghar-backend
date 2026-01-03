import config from "@/src/config/index.js";
import bcrypt from "bcrypt"

const createUser = async(payload:any)=>{
    const {name, email, password,role} = payload
    const salt = Number(config.bcrypt_salt_rounds)
    // Hash password
    const hashedPass = await bcrypt.hash(payload.password, salt);
    payload.password = hashedPass

}