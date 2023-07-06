import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import {MailerModule} from "@nestjs-modules/mailer";
import {HandlebarsAdapter} from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import {join} from "path";

@Module({
  imports:[
      MailerModule.forRoot({
        transport:{
            host:'pro1.mail.ovh.net',
            secure:false,
            auth:{
                user:'monbudget@easylocmoto.fr',
                pass:'ChallengeESGI2023'
            },
        },
        defaults:{
            from: '"No Reply" <monbudget@easylocmoto.fr>',
        },
        template:{
            dir: join(__dirname, 'templates'),
            adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
            options: {
                strict: true,
            },
        },
      }),
  ],
  providers: [MailService],
  exports:[MailService],
})
export class MailModule {}
