import { ConfigProvider, theme } from "antd";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ListFiles from "./pages/ListFiles";
import UploadCsv from "./pages/UploadCsv";
import CustomLayout from "./layout/CustomLayout";

function App() {
  const router = createBrowserRouter([
    {
      element: <CustomLayout />,
      children: [
        {
          path: "/",
          element: <ListFiles />,
        },
        {
          path: "/upload-csv",
          element: <UploadCsv />,
        },
      ],
    },
  ]);

  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm,
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </>
  );
}

export default App;
