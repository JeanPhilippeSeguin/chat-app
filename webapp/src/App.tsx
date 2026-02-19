import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router";

import router from "@router/AppRouter";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "var(--font-family)",
          colorBgContainer: "transparent",
          colorText: "var(--app--color)",
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
