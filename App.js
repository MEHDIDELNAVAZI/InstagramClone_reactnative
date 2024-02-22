import Authuser from "./Authuser";
import { ProgressProvider } from "./context/ProgressContext";
export default function App() {
  return (
    <ProgressProvider>
      <Authuser />
    </ProgressProvider>
  );
}
