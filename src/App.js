import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.scss";
import { router_link } from "./common ";

const HomePage = lazy(() => import("./page/HomePage"));
const SignIn = lazy(() => import("./page/SIgnInPage"));
const SignUp = lazy(() => import("./page/SignUpPage"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={"loading"}>
        <Routes>
          <Route path={router_link.HOME} element={<HomePage />}></Route>
          <Route path={router_link.SIGN_IN} element={<SignIn />}></Route>
          <Route path={router_link.SIGN_UP} element={<SignUp />}></Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
