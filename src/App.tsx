import { RouterProvider } from "react-router-dom";
import router from "./routes";
import "./App.css";

function App() {
  return (
    <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  );
}

export default App;
