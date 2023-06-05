import MitigationQuiz from "./MitigationQuiz"
import { Routes, Route } from "react-router-dom";
import App from "./App";

const RoutesComponent = (props: any) => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/mitigation_questions" element={< MitigationQuiz />}>
            </Route>
        </Routes>
    )
}

export default RoutesComponent