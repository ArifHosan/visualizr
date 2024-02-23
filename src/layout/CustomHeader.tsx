import { Header } from "antd/es/layout/layout";
import icon from "../assets/icon.jpg";

function CustomHeader() {
    return (
        <Header className="header">
            <div className="logo">
                <img src={icon} alt="logo" />
            </div>
            <h2>Visualizr</h2>
        </Header>
    );
}

export default CustomHeader;
