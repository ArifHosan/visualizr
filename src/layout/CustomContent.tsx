import { Content } from "antd/es/layout/layout";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import Home from "../pages/Home";

function CustomContent() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
  ]);

  
  return (
    <Content className="content">
      <RouterProvider router={router} />
    </Content>
  );
}
export default CustomContent;
