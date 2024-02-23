import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { HomeOutlined } from '@ant-design/icons';
function CustomSider() {
    const items = [
        {
            key: "1",
            label: "Home",
            icon: <HomeOutlined />,
            link: "",
        },
      ];
    return (
        <Sider collapsible className="sider">
            <Menu className="gap" theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
    );
}

export default CustomSider;