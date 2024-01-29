export const createPieChartData = (formData, getColorSchemeForAspect) => {
  if (!formData || !formData.evaluationFeedbacks) {
    return [];
  }

  const aspectData = {};

  formData.allFeedbacks.forEach((feedback) => {
    if (feedback.evaluationAspect && feedback.evaluationAspect.aspects) {
      Object.entries(feedback.evaluationAspect.aspects).forEach(
        ([aspect, value]) => {
          if (!aspectData[aspect]) {
            aspectData[aspect] = {
              positive: 0,
              neutral: 0,
              negative: 0,
              colors: getColorSchemeForAspect(aspect),
            };
          }
          aspectData[aspect][value]++;
        }
      );
    }
  });

  const chartData = Object.entries(aspectData).map(([aspect, values]) => {
    return {
      labels: Object.keys(values),
      datasets: [
        {
          data: Object.values(values),
          backgroundColor: values.colors,
        },
      ],
      aspect,
    };
  });

  return chartData;
};

export const getColorSchemeForAspect = (aspect) => {
  const colorSchemes = {
    instructional_effectiveness: ["orange", "black", "red"],
    learning_environment: ["green", "black", "red"],
    assessment_feedback_and_fairness: ["purple", "black", "red"],
    assessment_evaluation_methods: ["blue", "black", "red"],
    lecture_quality: ["pink", "black", "red"],
    instructor_availability: ["pink", "black", "red"],
    classroom_interaction: ["gray", "black", "red"],
  };
  return colorSchemes[aspect] || ["aqua", "black", "red"];
};
