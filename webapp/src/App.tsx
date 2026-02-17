import { RouterProvider } from "react-router";

import router from "@router/AppRouter";
import useGetCurrentUser from "@modules/user/hooks/useGetCurrentUser";

function App() {
  const { data: user, isLoading } = useGetCurrentUser();

  return isLoading ? <div>loading...</div> : <RouterProvider router={router} />;
}

export default App;
