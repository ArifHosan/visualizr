import { ConfigProvider, theme } from "antd";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ListFiles from "./pages/ListFiles";
import UploadCsv from "./pages/UploadCsv";
import CustomLayout from "./layout/CustomLayout";
import TableView from "./pages/TableView";
import Home from "./pages/Home";
import Graph from "./pages/Graph";

function App() {
  const router = createBrowserRouter([
    {
      element: <CustomLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/dashboard",
          element: <ListFiles />,
        },
        {
          path: "/upload-csv",
          element: <UploadCsv />,
        },
        {
          path: "/edit-csv/:id",
          element: <TableView />,
        },
        {
          path: "/generate-graph/:id",
          element: <Graph />,
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
