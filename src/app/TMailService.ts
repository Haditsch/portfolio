import * as nodemailer from 'nodemailer'; 
import { ServiceLocator } from './ServiceLocator'; 
import { ISystemSettings } from './ISystemSettings'; 

let smtpSinkSettings : ISystemSettings  = { 
    SmtpServerConnectionString : 'smtp://localhost:1025', 
    SmtpFromAddress : 'smtp_from@test.com' 
  }; 

  ServiceLocator.register('ISystemSettings', smtpSinkSettings); 

  let currentSettings : ISystemSettings =  
    ServiceLocator.resolve('ISystemSettings'); 

  console.log(`current smtp from address : 
    ${currentSettings.SmtpFromAddress}`); 

export default class TMailService { 
    private _transporter: nodemailer.Transporter; 
    private _settings: ISystemSettings; 

    constructor() { 
        this._settings =  
          ServiceLocator.resolve('ISystemSettings'); 
        this._transporter = nodemailer.createTransport( 
          this._settings.SmtpServerConnectionString 
        ); 
    } 
    sendMail(to: string, subject: string, content: string) 
    : Promise<void> 
    { 
      let options = { 
        from: this._settings.SmtpFromAddress, 
        to: to, 
        subject: subject, 
        text: content 
      } 
  
      return new Promise<void> ( 
        (resolve: (msg: any) => void,  
          reject: (err: Error) => void) => { 
            this._transporter.sendMail(  
              options, (error, info) => { 
                if (error) { 
                  console.log(`error: ${error}`); 
                  reject(error); 
                } else { 
                    console.log(`Message Sent 
                      ${info.response}`); 
                    resolve(`Message Sent  
                      ${info.response}`); 
                } 
            }) 
          } 
      ); 
    } 
  } 