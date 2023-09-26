import { RouterProvider } from "react-router-dom";
import { OverlayProvider } from "./context/overlay.context";
import { router } from "./routes/routes";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <OverlayProvider>
        <RouterProvider router={router} />
      </OverlayProvider>
    </Provider>
  );
}

export default App;
