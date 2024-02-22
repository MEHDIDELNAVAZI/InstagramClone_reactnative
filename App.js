import Authuser from "./Authuser";
import SlideUpView from "./components/Commentsection";
import { ProgressProvider } from "./context/ProgressContext";
export default function App() {
  return (
    <ProgressProvider>
      <Authuser />
    </ProgressProvider>
  );
}
