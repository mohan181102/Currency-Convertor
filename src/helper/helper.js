import nodemailer from "nodemailer"
import User from "@/models/user.model";
import bcryptjs from "bcrypt"

export const sendEmail = async function({email, emailType, userId}){
    try {
        const hashToken = await bcryptjs.hash(userId.toString(), 10)

        if(emailType=="VERIFY"){
            await User.findByIdAndUpdate(userId,
                {$set:{
                    verifyToken:hashToken,
                    verifyTokenExpry:Date.now()+3600000,}
                }
            )
        }

        if(emailType=="RESET"){
            await User.findByIdAndUpdate(userId,
                {$set:{
                    ForgetPasswordToken:hashToken,
                    ForgetPasswordTokenExpry:Date.now()+3600000,}
                }
            ) 
        }

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "e7225d94f9cf71",
              pass: "6000634974b9db"
            }
        });

        const mailoption = {
            from: 'manmohan33chandrakar@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType=="VERIFY"? "Verify your account":"Reset password", // Subject line
            text: "Hello world?", // plain text body
            html: `<p><a href="${process.env.DOMAIN}/verifyemail?token=${hashToken}">click here ${hashToken}</a> ${emailType=="VERIFY"? "to verify your account":"to reset your account"}</p>`, // html body
        }

        const mailResponse = await transporter.sendMail(mailoption)

        return mailResponse
    } catch (error) {
        throw new Error(error.message)        
    }
}