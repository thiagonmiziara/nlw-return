import { ArrowLeft } from "phosphor-react";
import { feedbackTypes } from "../../constants/feedbackTypes";
import { TFeedbackTypes } from "../../containers/widgetForm/WidgetForm";
import CloseButton from "../CloseButton";

interface IFeedbackContentStepProps {
  feedbackType: TFeedbackTypes;
  onFeedbackRestartRequested: () => void;
}

const FeedbackContentStep = ({
  feedbackType,
  onFeedbackRestartRequested,
}: IFeedbackContentStepProps) => {
  const feedbackTypeInfo = feedbackTypes[feedbackType];

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

      <div className='flex py-8 w-full'></div>
    </>
  );
};

export default FeedbackContentStep;
