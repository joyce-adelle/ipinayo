import * as nodemailer from "nodemailer";

export async function sendEmail(email: string, url: string, password?: string) {
  const account = await nodemailer.createTestAccount();
  console.log(account);

  const transporter = nodemailer.createTransport({
    service:'Ethereal',
    host: account.smtp.host,
    secure: account.smtp.secure, // true for 465, false for other ports
    auth: {
      user: account.user, // generated ethereal user
      pass: account.pass // generated ethereal password
    }
  });

  const mailOptions = {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: password ? `<a href="${url}">${url}</a> <br /> <br /> Your one time password is ${password}` : `<a href="${url}">${url}</a>` // html body
  };

  const info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
