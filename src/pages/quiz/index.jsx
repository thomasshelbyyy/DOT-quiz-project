import { useEffect, useState } from "react";
import QuizComponent from "../../components/quizComponent";
import { resetLocalStorage } from "../../utils";

const QuizPage = ({
	setPage,
	questions,
	setAnsweredQuestionCount,
	setCorrectAnswerCount,
	currentQuestion,
	setCurrentQuestion,
	timer,
	setTimer,
}) => {
	const formatTime = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
	};

	useEffect(() => {
		const handleClick = (e) => {
			e.preventDefault();
			if (e.key === "Escape") {
				alert("Click");
			}
		};
		window.addEventListener("keyup", handleClick);

		return () => window.removeEventListener("keyup", handleClick);
	}, []);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTimer((prev) => {
				if (prev > 0) {
					return prev - 1;
				} else {
					setPage("finish");
					clearInterval(intervalId);
					setCurrentQuestion(0);
					setTimer(180);
					localStorage.removeItem("quizActive");
					resetLocalStorage();
					return 0;
				}
			});
		}, 1000);

		return () => clearInterval(intervalId);
	}, [setPage]);

	useEffect(() => {
		const handleClose = () => {
			localStorage.setItem("quizEndTime", Date.now());
			localStorage.setItem("timeRemaining", timer);
		};

		window.addEventListener("beforeunload", handleClose);

		return () => window.removeEventListener("beforeunload", handleClose);
	}, [timer]);

	const currentQuestionData = questions[currentQuestion];

	return (
		<div className="w-full md:w-3/4 lg:w-1/2 px-3 md:px-2 lg:px-0 text-white">
			<div className="w-full flex justify-between px-4 py-3">
				<p>No. {currentQuestion + 1}</p>
				<p>Time Left: {formatTime(timer)}</p>{" "}
			</div>
			{currentQuestionData && (
				<QuizComponent
					correctAnswer={currentQuestionData.correct_answer}
					currentQuestion={currentQuestion}
					question={currentQuestionData.question}
					setCurrentQuestion={setCurrentQuestion}
					incorrectAnswers={currentQuestionData.incorrect_answers}
					setAnsweredQuestionCount={setAnsweredQuestionCount}
					setCorrectAnswerCount={setCorrectAnswerCount}
					setPage={setPage}
					setTimer={setTimer}
				/>
			)}
		</div>
	);
};

export default QuizPage;
