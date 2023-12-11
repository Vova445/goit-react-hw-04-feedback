import React, { useState, useEffect } from "react";
import styles from "./Feedback.module.css";
import Statistics from "./Folder/Statistics";
import FeedbackOptions from "./Folder/FeedbackOptions";
import Section from "./Folder/Section";
import Notification from "./Folder/Notification";

const Feedback = () => {
  const [feedbackState, setFeedbackState] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const feedback = (type) => {
    setFeedbackState((prevState) => ({
      ...prevState,
      [type]: prevState[type] + 1,
    }));
  };

  const countTotalFeedback = () => {
    const { good, neutral, bad } = feedbackState;
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const { good } = feedbackState;
    const total = countTotalFeedback();
    return total === 0 ? 0 : Math.round((good / total) * 100);
  };

  useEffect(() => {
  }, [feedbackState]);

  const { good, neutral, bad } = feedbackState;
  const total = countTotalFeedback();
  const positive = countPositiveFeedbackPercentage();

  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>Please leave feedback</h2>
      <FeedbackOptions
        options={Object.keys(feedbackState)}
        onLeaveFeedback={feedback}
      />
      <Section title="Statistics">
        {total > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positive={positive}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};

export default Feedback;
