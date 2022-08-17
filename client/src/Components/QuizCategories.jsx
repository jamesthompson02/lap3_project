// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const QuizCategories = () => {
//   const [categories, setCategories] = useState([]);
//   const [questionNum, setQuestionNum] = useState(-1);

//   const next_question = () => {
//     setQuestionNum((prev) => prev + 1);
//     console.log(question[questionNum]);
//     console.log(answer[questionNum]);
//   };

//   const fetchQuizCategories = async () => {
//     const { data } = await axios.get(
//       'https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple'
//     );
//     const formattedData = data.results.map((category) => {
//       const incorrectAnswersIndexes = category.incorrect_answers.length;
//       const randomIndex = Math.random() * (incorrectAnswersIndexes - 0) + 0;
//       category.incorrect_answers.splice(
//         randomIndex,
//         0,
//         category.correct_answer
//       );
//       return {
//         ...category,
//         answers: category.incorrect_answers,
//       };
//     });

//     setCategories(formattedData);
//   };

//   useEffect(() => {
//     fetchQuizCategories();
//   }, []);

//   const question = categories.map((categories) => (
//     <div className="questions" key={categories.question}>
//       {categories.question}
//     </div>
//   ));
//   const answer = categories.map((categories) => (
//     <div className="answer" key={categories.answers}>
//       {categories.answers}
//     </div>
//   ));

//   return (
//     <div>
//       <div className="question_display">
//         <button onClick={next_question}>next_question</button>
//         <h2>questions={question[questionNum]}</h2>
//         <p>answers={answer[questionNum]}</p>
//       </div>
//       <div></div>
//     </div>
//   );
// };
// export default QuizCategories;
