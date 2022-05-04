import { useState } from "react";

import FeedbackContentStep from "../../components/FeedbackContentStep";
import FeedbackTypeStep from "../../components/FeedbackTypeStep";
import { feedbackTypes } from "../../constants/feedbackTypes";

export type TFeedbackTypes = keyof typeof feedbackTypes;

const WidgetForm = () => {
  const [feedbackType, setFeedbackType] = useState<TFeedbackTypes | null>(null);

  function handleRestartFeedback() {
    setFeedbackType(null);
  }

  return (
    <div className='bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto'>
      {!feedbackType ? (
        <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
      ) : (
        <FeedbackContentStep
          feedbackType={feedbackType}
          onFeedbackRestartRequested={handleRestartFeedback}
        />
      )}

      <footer className='text-xs text-neutral-400'>
        Feito com ❤️ pelo{" "}
        <a
          href='https://www.linkedin.com/in/thiago-nunes-miziara-92a85b6a/'
          target={"_blank"}
          className='underline underline-offset-2'
        >
          Thiago Miziara
        </a>
      </footer>
    </div>
  );
};

export default WidgetForm;
