const fetchFeedbackQuestions = () => {
  let res = {
    feedbackLanguage: "en",
    pipelineFeedback: {
      commonFeedback: [
        {
          question: "Are you satisfied with the pipeline response?",
          supportedFeedbackTypes: ["rating", "thumbs", "comment"],
        },
      ],
    },
    taskFeedback: [
      {
        taskType: "asr",
        commonFeedback: [
          {
            question: "Are you satisfied with the ASR response?",
            supportedFeedbackTypes: ["rating", "thumbs", "comment"],
          },
        ],
        granularFeedback: [
          {
            question: "Was the speech accurately recognised?",
            supportedFeedbackTypes: ["rating", "thumbs", "comment"],
          },
          {
            question: "Which are the areas that ASR can improve upon?",
            supportedFeedbackTypes: [
              "rating-list",
              "comment-list",
              "thumbs-list",
              "checkbox-list",
            ],
            parameters: [
              "names",
              "places",
              "numbers",
              "dates",
              "English words / code mixed words",
              "technical terms",
            ],
          },
          {
            question: "Was the background noise handled properly?",
            supportedFeedbackTypes: ["rating", "thumbs", "comment"],
          },
          {
            question:
              "Was the application able to recognise the speech if you spoke in an accented tone?",
            supportedFeedbackTypes: ["rating", "thumbs", "comment"],
          },
          {
            question:
              "Is there any other specific case where the Speech was constantly incorrectly recognised?",
            supportedFeedbackTypes: ["comment"],
          },
          {
            question: "How would you rate the Speech Recognition?",
            supportedFeedbackTypes: ["rating"],
          },
        ],
      },
      {
        taskType: "translation",
        commonFeedback: [
          {
            question: "Are you satisfied with the Translation response so far?",
            supportedFeedbackTypes: ["rating", "thumbs", "comment"],
          },
        ],
        granularFeedback: [
          {
            question:
              "Was the application able to translate complex sentences?",
            supportedFeedbackTypes: ["rating", "thumbs", "comment"],
          },
          {
            question: "Which are the areas that Translation can improve upon?",
            supportedFeedbackTypes: [
              "rating-list",
            ],
            parameters: [
              "names",
              "places",
              "numbers",
              "dates",
              "English words / code mixed words",
              "technical terms",
              "URLs",
            ],
          },
          {
            question:
              "Was the translated text grammatically correct and well-structured?",
            supportedFeedbackTypes: ["rating", "thumbs", "comment"],
          },
          {
            question:
              "Is there any other specific case where the translation seemed to fail?",
            supportedFeedbackTypes: ["comment"],
          },
          {
            question: "How would you rate the translation?",
            supportedFeedbackTypes: ["rating"],
          },
        ],
      },
    ],
  };
  return res;
};

export { fetchFeedbackQuestions };
