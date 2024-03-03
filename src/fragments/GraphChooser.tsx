import { Flex, Row, Col, Card, Button } from "antd";

import line_chart from "/examples/line_chart.svg";
import bar_chart from "/examples/bar_chart.svg";

type Props = {
  onChosen: (type: string) => void;
};

const GraphChooser: React.FC<Props> = ({ onChosen }) => {
  const charts = [
    {
      type: "line",
      title: "Line Chart",
      img: line_chart,
    },
    {
      type: "bar",
      title: "Bar Chart",
      img: bar_chart,
    },
    {
      type: "pie",
      title: "Pie Chart",
      img: line_chart,
    },
  ];
  return (
    <>
      <Flex gap="middle" vertical align="center" justify="space-between">
        <h3>Choose Graph Type</h3>
        <Flex gap="middle" align="center" justify="space-between">
          <Row
            gutter={[
              { xs: 0, sm: 16, md: 16, lg: 32 },
              { xs: 8, sm: 16, md: 24, lg: 32 },
            ]}
          >
            {charts.map((chart) => {
              return (
                <Col
                  xs={{ flex: "100%" }}
                  sm={{ flex: "50%" }}
                  lg={{ flex: "33%" }}
                  key={chart.type}
                  className="gutter-row"
                >
                  <Card
                    hoverable
                    bordered={false}
                    title={chart.title}
                    cover={<img alt={chart.title} src={chart.img} />}
                    actions={[
                      <Button type="primary" onClick={() => {onChosen(chart.type)}}>
                        Plot
                      </Button>,
                    ]}
                  ></Card>
                </Col>
              );
            })}
          </Row>
        </Flex>
      </Flex>
    </>
  );
};

export default GraphChooser;
