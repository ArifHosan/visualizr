import { Footer } from "antd/es/layout/layout";

function CustomFooter() {
    return (
        <Footer className="footer">
            Visualizr ©{new Date().getFullYear()} Created by <a href="https://arifhosan.me" target="_blank" rel="noreferrer">Arif Hosan</a>
        </Footer>
    )
}
export default CustomFooter;