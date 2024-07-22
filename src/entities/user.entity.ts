import { Entity,Column } from "typeorm";
import Base from "./base.entity";
@Entity("user")
export class User extends Base{
    @Column()
    email:string;

    @Column({default:false})
    isVerified:boolean;
    @Column({nullable:true})
    verificationToken:string;

    @Column()
    password:string
}