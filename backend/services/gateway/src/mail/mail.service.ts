import {Injectable} from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendUserConfirmation(username,email,token:string){
        const url = `https://monbuget.fr/user/confirm/${token}`;
        await  this.mailerService.sendMail({
            to: email,
            subject:'Welcome to Mon Budget! Please Confirm your Email',
            template:'./confirmation',
            context:{
                name:username,
                url,
            },

        })
    }
}
