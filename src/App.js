import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import "./index.scss";
import { router_link } from "./common ";
import Modal from "./components/modal/Modal";

const HomePage = lazy(() => import("./page/HomePage"));
const SignIn = lazy(() => import("./page/SignIn-Page"));
const SignUp = lazy(() => import("./page/SignUpPage"));
const WindownChat = lazy(() => import("./module/home/WindownChat"));
const Users = lazy(() => import("./page/UsesPage"));
const NotFoundPage = lazy(() => import("./page/NotFoundPage"));

function App() {
  return (
    <div className="App">
      <Modal></Modal>
      <Suspense fallback={"loading"}>
        <Routes>
          <Route path={router_link.HOME} element={<HomePage />}>
            <Route
              path={router_link.MESSAGES}
              element={<WindownChat />}
            ></Route>
            <Route path={router_link.USER} element={<Users />}></Route>
          </Route>
          <Route path={router_link.SIGN_IN} element={<SignIn />}></Route>
          <Route path={router_link.SIGN_UP} element={<SignUp />}></Route>

          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
