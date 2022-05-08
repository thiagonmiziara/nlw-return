import { IMailAdapter } from "../adapters/mail-adapters";
import { IFeedbacksRepository } from "../repositories/feedbacks-repository";

interface ISubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: IFeedbacksRepository,
    private mailAdapter: IMailAdapter
  ) {}

  async execute(request: ISubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if (!type) {
      throw new Error("Type is required");
    }

    if (!comment) {
      throw new Error("Comment is required");
    }

    if (screenshot && !screenshot.startsWith("data:image/png;base64,")) {
      throw new Error("Screenshot is not a base64 encoded image");
    }

    await this.feedbacksRepository.create({ type, comment, screenshot });

    await this.mailAdapter.sendMail({
      subject: "Novo Feedback",
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}" />` : "",
        `</div>`,
      ].join("\n"),
    });
  }
}
