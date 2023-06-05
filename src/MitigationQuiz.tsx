import { useEffect, useState } from 'react'

const MitigationQuiz = () => {
  const [mitigationQuestions, setMitigationQuestions] = useState<[]>([])
  const [questionsData, setQuestionsData] = useState<any>([])
  const [answers, setAnswers] = useState<any>([])
  const [submitQuiz, setSubmitQuiz] = useState<boolean>(false)
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [answerSelected, setAnswerSelected] = useState<string>("")

  useEffect(() => {
    fetch("/mitigation_questions")
      .then((response) => response.json())
      .then((data) => setQuestionsData(data))
  }, []);

  useEffect(() => {
    if (questionsData.length > 0) {
     setMitigationQuestions(questionsData.map((q: {question: any;}) => q.question));
      const allAnswers = questionsData.map((q: { answers: any }) => q.answers);
      const mergedAnswers = [].concat.apply([], allAnswers);
      setAnswers(mergedAnswers);
    }
  }, [questionsData]);

  const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    let isChecked = e.target.checked;
    setIsChecked(!isChecked)
    isChecked && setAnswerSelected(e.target.value)
  }

  const showScore = () => {
    return (
      <div
        style={{ display: submitQuiz ? "" : "none" }}>
        <p>{`Tu as obtenu X points`}</p>
      </div>
    );
  };

  async function sendAnswer() {
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ answer: answerSelected })
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('result', result);
    } catch (err) {
      console.log(err);
    }
  }

  const onSubmit = () => {
    setSubmitQuiz(true)
    sendAnswer()
  }
  return (
    <>
    <h1>Teste pour découvrir comment tu peux
        aider à protéger l'environnement</h1>
      {mitigationQuestions ? (
    mitigationQuestions.map((question: any) => (
     <>
        <p>{question}</p>
      </>
    ))
  ) : (
    <div>Charger les questions...</div>
  )}
      {answers.length > 0 ? (
    answers.map((answer: any) => (
     <>
        <input type="checkbox" value={answer.answer} onChange={(e) => onChangeCheckbox(e)} />
        {answer.answer}
      </>
    ))
  ) : (
    <div>Charger les réponses...</div>
  )}
  <button type="submit" onClick={() => onSubmit()}>Soumettre</button>
    <a href="/mitigation_questions">Passe un autre quiz pour tester tes connaissances sur
        l'environnement</a>
    {showScore()}
  </>
  )
}

export default MitigationQuiz