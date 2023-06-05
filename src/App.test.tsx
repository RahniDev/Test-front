import { fireEvent, getByTestId, render, screen } from "@testing-library/react";
import App from "./App";

test("renders questionnaire", () => {
  render(<App />);
  const linkElement = screen.getByText(/Teste tes connaissances sur l'environnement/i);
  expect(linkElement).toBeInTheDocument();
});

test("click submit button for environment quiz", () => {
  const {container} = render(<App />);

  const button = getByTestId(container, 'submit-quiz-btn');
  fireEvent.click(button);
});

test("contains link text to go to the other quiz", () => {
const container = render(<App />);
const quizLink = "Passe un autre quiz pour découvrir comment tu peux aider à protéger l'environnement"
expect(container.getByText(quizLink))
})