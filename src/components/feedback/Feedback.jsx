import { Component } from "react";
import styles from './Feedback.module.css';
import Statistics from "./Folder/Statistics";
import FeedbackOptions from "./Folder/FeedbackOptions";
import Section from "./Folder/Section";
import Notification from "./Folder/Notification";

class Feedback extends Component{
    state = {
        good: 0,
        neutral: 0, 
        bad: 0,
    }
    feedback = (type) => {
        this.setState((prevState) => ({
            [type]: prevState[type] + 1,
        }))
    };

    countTotalFeedback = () => {
        const { good, neutral, bad } = this.state;
        return good + neutral + bad;
    }

    countPositiveFeedbackPercentage = () => {
        const { good } = this.state;
        const total = this.countTotalFeedback();
        return total === 0 ? 0 : Math.round((good / total) * 100);
    }

    render(){
        const { good, neutral, bad } = this.state;
        const total = this.countTotalFeedback();
        const positive = this.countPositiveFeedbackPercentage();
        
        return (
            <div className={styles.continer}>
                <h2 className={styles.h2}>Please leave feedback</h2>
                <FeedbackOptions
                    options={Object.keys(this.state)}
                    onLeaveFeedback={this.feedback}
                />
                 <Section title="Statistics">
                    {total > 0 ?  (
                 <Statistics
                    good={good}
                    neutral={neutral}
                    bad={bad}
                    total={total}
                    positive={positive}
                 />
                 )
                : (
                    <Notification message = "There is no feedback" />
                )}
                    </Section>
                </div>
        )
    }
}

export default Feedback;