import { CheckIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import { getQuiz } from "../../utils";

const FinishPage = ({
	setPage,
	correctAnswerCount,
	wrongAnswerCount,
	totalAnsweredQuestion,
	setQuestions,
	setAnsweredQuestionCount,
	setCorrectAnswerCount,
	setTimer,
	setCurrentQuestion,
}) => {
	const score = Math.ceil((correctAnswerCount / 30) * 100);
	const handlePlayAgain = async () => {
		const data = await getQuiz();
		setQuestions(data);
		setAnsweredQuestionCount(0);
		setCorrectAnswerCount(0);
		setTimer(180);
		setPage("quiz");
		setCurrentQuestion(0);
		localStorage.setItem("quizActive", true);
	};
	const handleBackToHome = () => {
		setAnsweredQuestionCount(0);
		setCorrectAnswerCount(0);
		setCurrentQuestion(0);
		setPage("home");
	};
	return (
		<div className="text-gray-100 text-lg font-medium">
			<div className="flex flex-col items-center gap-1 text-2xl">
				<p className="">Your Score is</p>
				<div className="py-3 px-4 rounded-full font-bold border border-gray-100">
					{score}
				</div>
			</div>
			<div className="flex items-center gap-2 mb-2">
				<span className="bg-gray-900 p-2 rounded-full">
					<ClipboardDocumentCheckIcon className="w-6 h-6 text-white" />
				</span>
				<span>Total Answered Question: {totalAnsweredQuestion}</span>
			</div>
			<div className="flex items-center gap-2 mb-2">
				<span className="bg-green-500 p-2 rounded-full">
					<CheckIcon className="w-6 h-6 text-white" />
				</span>
				<span>Total Correct Answer: {correctAnswerCount}</span>
			</div>
			<div className="flex items-center gap-2 mb-2">
				<span className="bg-red-500 p-2 rounded-full">
					<XMarkIcon className="w-6 h-6 text-white" />
				</span>
				<span>Total Incorrect Answer: {wrongAnswerCount}</span>
			</div>
			<div className="flex flex-col">
				<button
					onClick={handlePlayAgain}
					className="px-3 py-2 bg-blue-500 rounded-full hover:bg-blue-700 transition duration-200 mb-1"
				>
					Play Again
				</button>
				<button
					onClick={handleBackToHome}
					className="px-3 py-2 bg-green-500 rounded-full hover:bg-green-700 transition duration-200"
				>
					back to home
				</button>
			</div>
		</div>
	);
};

export default FinishPage;
