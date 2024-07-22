import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import {DotenvConfig} from '../config/env.config'
class EmailService{
     private transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:DotenvConfig.MAIL_USERNAME,
            pass:DotenvConfig.MAIL_PASSWORD,

        }
    })
    public generateToken(email:string):string{

        return jwt.sign({email},DotenvConfig.REFRESH_TOKEN_SECRET,{expiresIn:'1h'});
    }
     async sendVerificationEmail(email:string,token:string){
        const mailConfigurations = {
            from: DotenvConfig.MAIL_FROM,
            to:email,
            subject:'Email Verification',
            text:`Hi! There, please follow the link for verification ${DotenvConfig.BASE_URL}/api/verify/${token}`
            

        }
        await this.transporter.sendMail(mailConfigurations)
    }
}
export default new EmailService()