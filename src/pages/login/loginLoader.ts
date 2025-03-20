import { redirect } from "react-router-dom";

import { fakeAuthProvider } from "~/auth.ts";

async function loginLoader() {
  if (fakeAuthProvider.isAuthenticated) {
    return redirect("/");
  }
  return null;
}

export default loginLoader;
