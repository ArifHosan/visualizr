import { Content } from "antd/es/layout/layout";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import ListFiles from "../pages/ListFiles";
import UploadCsv from "../pages/UploadCsv";

function CustomContent() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ListFiles />,
    },
    {
      path: "/list",
      element: <ListFiles />,
    },
    {
      path: "/upload-csv",
      element: <UploadCsv />,
    },
  ]);

  
  return (
    <Content className="content">
      <RouterProvider router={router} />
    </Content>
  );
}
export default CustomContent;
