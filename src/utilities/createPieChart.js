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
    instructional_effectiveness: ["orange", "yellow", "black"],
    learning_environment: ["green", "yellow", "black"],
    assessment_feedback_and_fairness: ["purple", "yellow", "black"],
    assessment_evaluation_methods: ["blue", "yellow", "black"],
    lecture_quality: ["pink", "yellow", "black"],
    instructor_availability: ["pink", "yellow", "black"],
    classroom_interaction: ["gray", "yellow", "black"],
  };
  return colorSchemes[aspect] || ["aqua", "yellow", "black"];
};
