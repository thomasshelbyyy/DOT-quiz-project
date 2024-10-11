import { useEffect, useState } from "react";
import QuizComponent from "../../components/quizComponent";

const QuizPage = ({
	setPage,
	questions,
	setAnsweredQuestionCount,
	setCorrectAnswerCount,
}) => {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [timer, setTimer] = useState(180); // Timer set to 180 seconds (3 minutes)

	// Convert timer to minutes and seconds format
	const formatTime = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		// Pad seconds with leading zero if it's less than 10
		return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
	};

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTimer((prev) => {
				if (prev > 0) {
					return prev - 1;
				} else {
					setPage("finish");
					clearInterval(intervalId); // Clear the interval when time runs out
					return 0; // Ensure timer doesn't go negative
				}
			});
		}, 1000);

		// Clean up interval on unmount
		return () => clearInterval(intervalId);
	}, [setPage]);

	// Ensure we are rendering a valid question when currentQuestion changes
	const currentQuestionData = questions[currentQuestion];

	return (
		<div className="w-full md:w-3/4 lg:w-1/2 px-3 md:px-2 lg:px-0 text-white">
			<div className="w-full flex justify-between px-4 py-3">
				<p>No. {currentQuestion + 1}</p>
				<p>Time Left: {formatTime(timer)}</p>{" "}
				{/* Use formatTime to display timer */}
			</div>
			{currentQuestionData && (
				<QuizComponent
					correctAnswer={currentQuestionData.correct_answer}
					currentQuestion={currentQuestion}
					question={currentQuestionData.question} // Pass only the question text
					setCurrentQuestion={setCurrentQuestion}
					incorrectAnswers={currentQuestionData.incorrect_answers}
					setAnsweredQuestionCount={setAnsweredQuestionCount}
					setCorrectAnswerCount={setCorrectAnswerCount}
					setPage={setPage}
				/>
			)}
		</div>
	);
};

export default QuizPage;
