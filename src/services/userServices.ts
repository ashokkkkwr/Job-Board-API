const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
import { User } from "../entities/user.entity"
import { AppDataSource } from "../config/database.config"
class UserServices{
    constructor(
        private readonly UserRepo = AppDataSource.getRepository(User),

        ){

        }

    async signup(body:any,token:string){

        const user = this.UserRepo.create({
            email:body.email,
            password:body.password,
            verificationToken:token,
            })
        await this.UserRepo.save(user)
        

    }
    async verifyUserToken(token:string){
        
        const user = await this.UserRepo.findOne({where:{verificationToken:token}})
        console.log(user,"user")
        if (user){user.isVerified = true;
        await this.UserRepo.save(user)}
        console.log(user)

        
      
    }
   
}
export default  new UserServices()