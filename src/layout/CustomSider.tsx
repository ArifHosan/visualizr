import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
function CustomSider() {
    const items = [
        {
            key: "1",
            label: "Option 1",
            icon: <UserOutlined />,
            link: "",
        },
        {
            key: "2",
            title: "Option 2",
            icon: "",
            link: "",
        },
        {
            key: "3",
            title: "Option 3",
            icon: "",
            link: "",
        },
      ];
    return (
        <Sider collapsible className="sider">
            <div className="demo-logo-vertical" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
    );
}

export default CustomSider;