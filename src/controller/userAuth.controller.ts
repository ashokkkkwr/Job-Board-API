import { Request, Response } from "express";
import userServices from "../services/userServices";
import emailService from "../services/email.service";
export class UserAuthController {
  async signup(req: Request, res: Response): Promise<void> {
    try {
        console.log('xiro')
      const body = req.body;
      const { email, password } = req.body;
      const token = emailService.generateToken(email);
      const data = await userServices.signup(body,token);
      await emailService.sendVerificationEmail(email, token);
      res
        .status(201)
        .send(
          "user registered. Please check your email to verify your account"
        );
    } catch (error) {
      res.status(400).send(error);
    }
  }
  async verifyEmail(req: Request, res: Response) {
    
    try {
       
      const  token  = req.params.id;
      await userServices.verifyUserToken(token);
      res.send("email verified successfully");
      
    } catch (error) {
      res.status(400).send("invalid or expired token.");
    }
  }
}
