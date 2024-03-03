import { Flex } from "antd";

const Home: React.FC = () => {
  return (
    <>
      <Flex
        justify="center"
        align="middle"
        style={{ height: "100%", background: "white" }}
      >
        <Flex vertical align="middle" style={{ alignItems: "center" }}>
          <h1>Visualizr</h1>
          <p>Visualize your data with ease!</p>
          <p>This is a completely offline application! All data are stored in your browser!</p>
          <p>Planned features includes, but not limited to: </p>
          <ul>
            <li>Upload CSV/Excel/JSON data</li>
            <li>View & Edit data</li>
            <li>Generate Graphs from data</li>
            <li>Export data</li>
            <li>Export Graphs</li>
          </ul>
          <h3>Update Progress</h3>
          <p>
            Currently, the following features are implemented: (as of
            01.03.2024)
          </p>
          <ul>
            <li>Upload CSV</li>
            <li>View & Edit CSV</li>
          </ul>
          <h3>This is open-sourced and the codes can be found in:</h3>
          <p>
            <a
              href="https://github.com/ArifHosan/visualizr"
              target="_blank"
              rel="noreferrer"
            >
              <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"></img>
            </a>
          </p>
          <h3>Technologies:</h3>
          <Flex wrap="wrap" gap={"middle"} align="center" justify="space-around">
            <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"></img>
            <img src="https://img.shields.io/badge/Ant_Design-0170FE?style=for-the-badge&logo=ant-design&logoColor=white"></img>
            <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"></img>
            <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white"></img>
            <img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white"></img>
          </Flex>
          <img
            style={{ marginTop: "1rem" }}
            src="http://ForTheBadge.com/images/badges/built-with-love.svg"
          />
        </Flex>
      </Flex>
    </>
  );
};
export default Home;
