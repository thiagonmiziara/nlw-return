import nodemailer from "nodemailer";
import { IMailAdapter, ISendMailData } from "../mail-adapters";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "cadea1e3e8b1bc",
    pass: "06ba425a0487dd",
  },
});

export class NodemailerMailAdapter implements IMailAdapter {
  async sendMail({ body, subject }: ISendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <feedget@gmail.com>",
      to: "Thiago Miziara <thiagonmiziara@gmail.com>",
      subject,
      html: body,
    });
  }
}
