import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { BarsOutlined, BookOutlined, HomeOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

function CustomSider() {
    const navigate = useNavigate();
    const items = [
        {
            key: "1",
            label: "Home",
            icon: <HomeOutlined />,
            link: "",
        },
        {
            key: "2",
            label: "Dashboard",
            icon: <BarsOutlined />,
            link: "dashboard",
        },
        {
            key: "3",
            label: "Upload CSV",
            icon: <BookOutlined />,
            link: "upload-csv",
        },
      ];
    const handleMenuClick = (e: any) => {
        const item = items.find((i) => i.key === e.key);
        if (item) {
            navigate(item.link);
        }
    }
    return (
        <Sider collapsible className="sider">
            <Menu className="gap" theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={handleMenuClick} />
        </Sider>
    );
}

export default CustomSider;