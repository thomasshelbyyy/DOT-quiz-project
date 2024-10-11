import { useState } from "react";
import { useAuth } from "../../context/authContext";
import FinishPage from "../finish";
import QuizPage from "../quiz";
import { getQuiz } from "../../utils";
import { PowerIcon } from "@heroicons/react/16/solid";

export default function HomePage() {
	const { loggedInUser, setLoggedInUser, setIsAuthenticated } = useAuth();

	const [page, setPage] = useState("home");
	const [questions, setQuestions] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [correctAnswerCount, setCorrectAsnwerCount] = useState(0);
	const [answeredQuestionCount, setAnsweredQuestionCount] = useState(0);

	const handleClick = async () => {
		setIsLoading(true);
		const quiz = await getQuiz();
		setIsLoading(false);
		setQuestions(quiz);
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
				/>
			)}
		</main>
	);
}

const answers = {
	correctAnswer: "Poison Potato",
	incorrectAnswer: ["Mors Oil", "Alpacookie", "Parmesansho Fruit"],
};
