import { Footer } from "antd/es/layout/layout";

function CustomFooter() {
    return (
        <Footer className="footer">
            Visualizr ©{new Date().getFullYear()} Created by Arif Hosan
        </Footer>
    )
}
export default CustomFooter;