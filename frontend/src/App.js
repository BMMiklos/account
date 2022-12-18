import { RouterProvider } from "react-router-dom";
import { OverlayProvider } from "./context/overlay.context";
import { router } from "./routes/routes";

function App() {
  return (
    <OverlayProvider>
      <RouterProvider router={router} />
    </OverlayProvider>
  );
}

export default App;
