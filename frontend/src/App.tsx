import "./App.css";
import Routers from "./routers";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routers />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
