import { useState } from "react";
import { ArrowLeft } from "phosphor-react";
import { feedbackTypes } from "../../constants/feedbackTypes";
import { TFeedbackTypes } from "../../containers/widgetForm/WidgetForm";
import { CloseButton } from "../CloseButton";
import { ScreenshotButton } from "../ScreenshotButton";
import { postFeedback } from "../../services/postFeedback";
import { Loading } from "../Loading";

interface IFeedbackContentStepProps {
  feedbackType: TFeedbackTypes;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: () => void;
}

const FeedbackContentStep = (props: IFeedbackContentStepProps) => {
  const { feedbackType, onFeedbackRestartRequested, onFeedbackSent } = props;

  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  function handleSubmitFeedback(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSendingFeedback(true);
    try {
      postFeedback({
        type: feedbackType,
        comment,
        screenshot,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsSendingFeedback(false);
      onFeedbackSent();
    }
  }

  return (
    <>
      <header>
        <button
          type='button'
          className='absolute top-5 left-5 text-zinc-400 hover:text-zinc-100'
          onClick={onFeedbackRestartRequested}
        >
          <ArrowLeft weight='bold' className='w-4 h-4' />
        </button>

        <span className='text-xl leading-6 flex items-center gap-2'>
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className='w-6 h-6'
          />
          {feedbackTypeInfo.title}
        </span>
        <CloseButton />
      </header>

      <form onSubmit={handleSubmitFeedback} className='my-4 w-full'>
        <textarea
          className='min-w[304px] w-full min-h-[112px] text-sm text-zinc-100 placeholder-zinc-400 p-4 bg-transparent border-2 border-zinc-600 rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none  scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin'
          placeholder='Conte com detalhes o que est?? acontecendo....?'
          onChange={(e) => setComment(e.target.value)}
        />

        <footer className='flex gap-2 mt-2'>
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />
          <button
            type='submit'
            className='p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-brand-500'
            disabled={comment.length === 0 || isSendingFeedback}
          >
            {isSendingFeedback ? <Loading /> : "Enviar Feedback"}
          </button>
        </footer>
      </form>
    </>
  );
};

export default FeedbackContentStep;
