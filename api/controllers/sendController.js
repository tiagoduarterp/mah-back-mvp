const mailer = require("nodemailer");

module.exports = (email, nome, mensagem, anexo) => {
    console.log('estou aqui', email, nome, mensagem, anexo)
    const smtpTransport = mailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: '',
            pass: ''
        }
    })
    /* 
    Nome do servidor: smtp.office365.com
        Porta: 587
        Método de criptografia: STARTTLS
    */
    const mail = {
        from: "tiago.duarte.rp@gmail.com",
        to: 'jonatasvieira@gmail.com,'+email,
        subject:' te enviou uma mensagem '+nome,
        text: mensagem,
    }
    
    if(anexo){
        console.log(anexo);
        mail.attachments = [];
        mail.attachments.push({
            filename: anexo.originalname,
            content: anexo.buffer
        })
    }
    
   /*  smtpTransport.sendMail(mail, (err, info) => { // Função que, efetivamente, envia o email.
        if (err) {
          return console.log(err)
        }
        
        console.log(info)
    }) */
    return new Promise((resolve, reject) => {
        smtpTransport.sendMail(mail)
            .then(response => {
                smtpTransport.close();
                return resolve(response);
            })
            .catch(error => {
                console.log('error')
                smtpTransport.close();
                return reject(error);
            });
    })
}