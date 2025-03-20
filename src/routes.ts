import { createBrowserRouter, redirect } from "react-router-dom";

import { fakeAuthProvider } from "./auth";
import Layout from "./layout";
import About from "./pages/about";
import Home from "./pages/home";
import LoginPage from "./pages/login";
import loginAction from "./pages/login/loginAction";
import loginLoader from "./pages/login/loginLoader";
import ProtectedPage from "./pages/protected";
import protectedLoader from "./pages/protected/loader";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    loader() {
      // Our root route always provides the user, if logged in
      return { user: fakeAuthProvider.username };
    },
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "login",
        action: loginAction,
        loader: loginLoader,
        Component: LoginPage,
      },
      {
        path: "protected",
        loader: protectedLoader,
        Component: ProtectedPage,
      },
    ],
  },
  {
    path: "/logout",
    async action() {
      // We signout in a "resource route" that we can hit from a fetcher.Form
      await fakeAuthProvider.signout();
      return redirect("/");
    },
  },
]);

export default router;
