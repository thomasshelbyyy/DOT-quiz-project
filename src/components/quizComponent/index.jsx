import { useEffect, useState } from "react";
import { resetLocalStorage } from "../../utils";

export default function QuizComponent({
	question,
	correctAnswer,
	setCurrentQuestion,
	currentQuestion,
	incorrectAnswers,
	setCorrectAnswerCount,
	setAnsweredQuestionCount,
	setPage,
	setTimer,
}) {
	const [answers, setAnswers] = useState([]);
	const [choosenAnswer, setChoosenAnswer] = useState(null);

	useEffect(() => {
		const allAnswers = [correctAnswer, ...incorrectAnswers];
		const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);
		setAnswers(shuffledAnswers);
	}, [correctAnswer, incorrectAnswers]);

	const handleChooseAnswer = (answer) => {
		setChoosenAnswer(answer);
	};

	const handleNextQuestion = () => {
		const isAnswerCorrect = choosenAnswer === correctAnswer;

		if (isAnswerCorrect) {
			setCorrectAnswerCount((prev) => {
				const newCount = prev + 1;
				localStorage.setItem("correctAnswerCount", newCount);
				return newCount;
			});
		}

		setAnsweredQuestionCount((prev) => {
			const newCount = prev + 1;
			localStorage.setItem("answeredQuestion", newCount);
			return newCount;
		});

		if (currentQuestion === 29) {
			setPage("finish");
			setCurrentQuestion(0);
			setTimer(180);
			localStorage.removeItem("quizActive");
			resetLocalStorage();
		} else {
			setCurrentQuestion((prev) => {
				const newCount = prev + 1;
				localStorage.setItem("currentQuestion", newCount);
				return newCount;
			});
		}

		setChoosenAnswer(null);
	};

	return (
		<>
			<div className="w-full rounded-lg border border-white p-3 text-lg font-medium">
				{question}
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
				{answers.map((answer, index) => (
					<button
						onClick={() => handleChooseAnswer(answer)}
						key={index}
						className={`p-3 border rounded-md ${
							choosenAnswer === answer ? "bg-green-600" : "bg-gray-800"
						} text-center`}
					>
						{answer}
					</button>
				))}
			</div>
			<button
				disabled={!choosenAnswer}
				onClick={handleNextQuestion}
				className="mt-4 bg-blue-600 text-white py-2 px-4 rounded float-right"
			>
				{currentQuestion === 29 ? "Finish" : "Next Question"}
			</button>
		</>
	);
}
