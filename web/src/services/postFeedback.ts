import { TFeedbackTypes } from "../containers/widgetForm/WidgetForm";
import api from "./api";

interface IPostFeedback {
  type: TFeedbackTypes;
  comment: string;
  screenshot: string | null;
}

const postFeedback = async (data: IPostFeedback) => {
  await api.post("/feedbacks", data);
};

export { postFeedback };
