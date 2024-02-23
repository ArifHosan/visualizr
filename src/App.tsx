import { ConfigProvider, Flex, Layout, theme } from "antd";
import "./App.css";
import CustomHeader from "./layout/CustomHeader";
import CustomSider from "./layout/CustomSider";
import CustomContent from "./layout/CustomContent";
import CustomFooter from "./layout/CustomFooter";

function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm,
        }}
      >
        <Flex gap="middle" wrap="wrap">
          <Layout className="layout">
            <CustomHeader />
            <Layout>
              <CustomSider />
              <Layout>
                <CustomContent />
                <CustomFooter />
              </Layout>
            </Layout>
          </Layout>
        </Flex>
      </ConfigProvider>
    </>
  );
}

export default App;
