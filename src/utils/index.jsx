export const getQuiz = async () => {
	const res = await fetch(
		"https://opentdb.com/api.php?amount=30&type=multiple"
	);
	const data = await res.json();
	localStorage.setItem("questions", JSON.stringify(data.results));
	return data.results;
};

export const resetLocalStorage = () => {
	localStorage.setItem("currentQuestion", 0);
	localStorage.setItem("correctAnswerCount", 0);
	localStorage.removeItem("quizEndTime");
	localStorage.removeItem("timeRemaining");
	localStorage.setItem("answeredQuestion", 0);
};
