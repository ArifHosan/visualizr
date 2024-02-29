import { Flex, Layout } from "antd";
import CustomFooter from "./CustomFooter";
import CustomHeader from "./CustomHeader";
import CustomSider from "./CustomSider";
import { Outlet } from "react-router-dom";
import { Content } from "antd/es/layout/layout";

function CustomLayout() {
  return (
    <Flex gap="middle" wrap="wrap">
      <Layout className="layout">
        <CustomHeader />
        <Layout>
          <CustomSider />
          <Layout>
            <Content className="content">
              <Outlet />
            </Content>
            {/* <CustomContent /> */}
            <CustomFooter />
          </Layout>
        </Layout>
      </Layout>
    </Flex>
  );
}
export default CustomLayout;
