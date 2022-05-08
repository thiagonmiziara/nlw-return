import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedbackUseCase = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("SubmitFeedbackUseCase", () => {
  it("should be able to submit feedback", async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: "BUG",
        comment: "This is a bug",
        screenshot: "data:image/png;base64,fgdfgsgsdgfsdfg44444ty676534456676",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should not able to submit feedback without type", async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: "",
        comment: "This is a bug",
        screenshot: "data:image/png;base64,fgdfgsgsdgfsdfg44444ty676534456676",
      })
    ).rejects.toThrow();
  });

  it("should not able to submit feedback without comment", async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64,fgdfgsgsdgfsdfg44444ty676534456676",
      })
    ).rejects.toThrow();
  });

  it("should not able to submit feedback with an invalid screenshot ", async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: "BUG",
        comment: "Exemple comment",
        screenshot: "image.jpg",
      })
    ).rejects.toThrow();
  });
});
