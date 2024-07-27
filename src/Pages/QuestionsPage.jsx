import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import shuffleAnswers from "../helpers/shuffleAnswers";
import calculateAge from "../helpers/calculateAge";
import "../CSS/QuestionsPage.css";
const URL = import.meta.env.VITE_BASE_URL;

const QuestionsPage = ({ user }) => {
  const { countryId, caseFileId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        console.log("Fetching questions for caseFileId:", caseFileId);
        const age = user ? calculateAge(user.dob) : null;
        const personAge = age >= 18 ? `older_questions` : `younger_questions`;
        console.log("User age:", age);
        const response = await fetch(`${URL}/api/${personAge}/${caseFileId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await response.json();
        const shuffledQuestions = data.map((question) => ({
          ...question,
          answers: shuffleAnswers([
            question.y_correct_answer || question.o_correct_answer,
            question.y_incorrect_answer1 || question.o_incorrect_answer1,
            question.y_incorrect_answer2 || question.o_incorrect_answer2,
            question.y_incorrect_answer3 || question.o_incorrect_answer3,
          ]),
        }));
        setQuestions(shuffledQuestions);
        setCurrentQuestionIndex(0);
        setScore(0);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [caseFileId, user, location.state?.refresh]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect =
      selectedAnswer ===
      (currentQuestion.y_correct_answer || currentQuestion.o_correct_answer);

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestionIndex === questions.length - 1) {
      const finalScore = isCorrect ? score + 1 : score;
      navigate(
        `/countries/${countryId}/case_files/${caseFileId}/questions/results`,
        {
          state: { score: finalScore, totalQuestions: questions.length },
        }
      );
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer("");
    }
  };

  const calculateProgress = () => {
    return ((currentQuestionIndex + 1) / questions.length) * 100;
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <div className="QuestionsPage">
        <div className="progress-bar">
          <div
            className="progress"
            style={{
              width: `${calculateProgress()}%`,
              backgroundColor: "#ffc121",
            }}
          ></div>
        </div>
        <h2>{currentQuestion.y_question || currentQuestion.o_question}</h2>
        <form onSubmit={handleSubmit}>
          {currentQuestion.answers.map((answer, index) => (
            <div className="answer-container">
              <section className="radio">
                <input
                  type="radio"
                  name="answer"
                  value={answer}
                  checked={selectedAnswer === answer}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
              </section>
              <section className="label">
                <label
                  key={index}
                  className={`answer-label ${
                    selectedAnswer === answer ? "selected" : ""
                  }`}
                >
                  {answer}
                </label>
              </section>
            </div>
          ))}
          <button type="submit" disabled={!selectedAnswer}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuestionsPage;
