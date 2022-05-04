import React from "react";
import { feedbackTypes } from "../../constants/feedbackTypes";
import { TFeedbackTypes } from "../../containers/widgetForm/WidgetForm";
import CloseButton from "../CloseButton";

interface IFeedbackTypeStepProps {
  onFeedbackTypeChanged: (feedbackType: TFeedbackTypes) => void;
}

const FeedbackTypeStep = ({
  onFeedbackTypeChanged,
}: IFeedbackTypeStepProps) => {
  return (
    <>
      <header>
        <span className='text-xl leading-6'>Deixe seu feedback</span>
        <CloseButton />
      </header>

      <div className='flex py-8 w-full'>
        {Object.entries(feedbackTypes).map(([key, value]) => (
          <button
            key={key}
            className='bg-zinc-800 rounded-lg py-5 ml-1 w-24 flex-1 flex flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none'
            onClick={() => onFeedbackTypeChanged(key as TFeedbackTypes)}
            type='button'
          >
            <img src={value.image.source} alt={value.image.alt} />
            <span>{value.title}</span>
          </button>
        ))}
      </div>
    </>
  );
};

export default FeedbackTypeStep;
