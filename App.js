import Authuser from "./Authuser";
import { ImageUploadProvider } from "./context/Doesimageuplouded";
import { ProgressProvider } from "./context/ProgressContext";
export default function App() {
  return (
    <ProgressProvider>
      <ImageUploadProvider>
        <Authuser />
      </ImageUploadProvider>
    </ProgressProvider>
  );
}
