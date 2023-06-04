import React, {useState} from 'react';
import css from './App.module.css';
import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleFeedback = event => {
    const { name } = event.target;
    if (name === 'good') {
      setGood(prevGood => prevGood + 1);
    }
    if (name === 'neutral') {
      setNeutral(prevNeutral => prevNeutral + 1);
    }
    if (name === 'bad') {
      setBad(prevBad => prevBad + 1);
    }
   
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    return Math.round((good * 100) / countTotalFeedback());
  };

  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();

  return (
      <div className={css.feedback}>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={{ good, neutral, bad }}
            onLeaveFeedback={handleFeedback}
          />
        </Section>

        <Section title="Statistics">
          {total === 0 ? 
            <Notification message="There is no feedback" />
           : 
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              positivePercentage={positivePercentage}
            />
          }
        </Section>
      </div>
    );
  }
