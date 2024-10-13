import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import FinishPage from "../finish";
import QuizPage from "../quiz";
import { getQuiz, resetLocalStorage } from "../../utils";
import { PowerIcon } from "@heroicons/react/16/solid";

export default function HomePage() {
	const { loggedInUser, setLoggedInUser, setIsAuthenticated } = useAuth();

	useEffect(() => {
		const isQuizActive = localStorage.getItem("quizActive");
		if (isQuizActive === "true") {
			setCurrentQuestion(parseInt(localStorage.getItem("currentQuestion")));
			setAnsweredQuestionCount(
				parseInt(localStorage.getItem("answeredQuestion"))
			);
			setCorrectAsnwerCount(
				parseInt(localStorage.getItem("correctAnswerCount"))
			);
			setQuestions(JSON.parse(localStorage.getItem("questions")));

			const savedEndTime = localStorage.getItem("quizEndTime");
			const savedTimeRemaining = localStorage.getItem("timeRemaining");

			const currentTime = Date.now();
			const timeElapsed = Math.floor((currentTime - savedEndTime) / 1000);

			const newTimeRemaining = savedTimeRemaining - timeElapsed;

			if (newTimeRemaining > 0) {
				setTimer(newTimeRemaining);
				setPage("quiz");
			} else {
				setTimer(0);
				setPage("finish");
				localStorage.removeItem("quizActive");
				resetLocalStorage();
			}
		}
	}, []);

	const [page, setPage] = useState("home");
	const [questions, setQuestions] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [correctAnswerCount, setCorrectAsnwerCount] = useState(0);
	const [answeredQuestionCount, setAnsweredQuestionCount] = useState(0);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [timer, setTimer] = useState(180);

	const handleClick = async () => {
		setIsLoading(true);
		const quiz = await getQuiz();
		setIsLoading(false);
		setQuestions(quiz);
		localStorage.setItem("quizActive", true);
		localStorage.setItem("correctAnswerCount", 0);
		localStorage.setItem("answeredQuestion", 0);
		localStorage.setItem("currentQuestion", 0);
		setPage("quiz");
	};

	const handleLogout = () => {
		setLoggedInUser(null);
		localStorage.removeItem("loggedInUser");
		setIsAuthenticated(false);
		localStorage.setItem("auth", "false");
	};
	return (
		<main className="w-screen h-screen bg-gray-500 flex justify-center items-center">
			{page === "home" && (
				<div className="flex flex-col justify-center gap-3">
					<p className="text-3xl font-medium text-white">
						welcome {loggedInUser}
					</p>
					<button
						onClick={handleClick}
						disabled={isLoading}
						className="px-3 py-2 bg-green-500 mx-auto rounded-full text-xl text-white font-medium hover:scale-125 transition duration-200"
					>
						Start Quiz
					</button>
					<button
						onClick={handleLogout}
						className=" flex gap-1 items-center px-3 py-2 bg-red-500 mx-auto rounded-full text-xl text-white"
					>
						<span>
							<PowerIcon className="w-5 h-5" />
						</span>
						<span>Logout</span>
					</button>
				</div>
			)}
			{page === "quiz" && (
				<QuizPage
					setPage={setPage}
					questions={questions}
					setAnsweredQuestionCount={setAnsweredQuestionCount}
					setCorrectAnswerCount={setCorrectAsnwerCount}
					currentQuestion={currentQuestion}
					setCurrentQuestion={setCurrentQuestion}
					setTimer={setTimer}
					timer={timer}
				/>
			)}
			{page === "finish" && (
				<FinishPage
					setPage={setPage}
					setQuestions={setQuestions}
					correctAnswerCount={correctAnswerCount}
					totalAnsweredQuestion={answeredQuestionCount}
					wrongAnswerCount={questions.length - correctAnswerCount}
					setAnsweredQuestionCount={setAnsweredQuestionCount}
					setCorrectAnswerCount={setCorrectAsnwerCount}
					setTimer={setTimer}
					setCurrentQuestion={setCurrentQuestion}
				/>
			)}
		</main>
	);
}
