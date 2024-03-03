import { useLiveQuery } from "dexie-react-hooks";
import { useParams } from "react-router-dom";
import { db } from "../services/db";
import { useState } from "react";
import { Flex, Steps } from "antd";
import GraphChooser from "../fragments/GraphChooser";

const Graph: React.FC = () => {
  let { id } = useParams();
  const [current, setCurrent] = useState(0);
  const csvDataByIdArray = useLiveQuery(
    () => db.csvData.where({ id: Number(id) }).toArray(),
    [id]
  );
  const [graphType, setGraphType] = useState("");

  const onGraphTypeChosen = (type: string) => {
    setGraphType(type);
    next();
  };

  const steps = [
    {
      title: "Choose Graph Tpye",
      content: <GraphChooser onChosen={onGraphTypeChosen} />,
    },
    {
      title: "Second",
      content: "Second-content",
    },
    {
      title: "Last",
      content: "Last-content",
    },
  ];
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const getContent = () => {
    return steps[current].content;
  };

  return (
    <>
      <Flex gap="middle" align="center" justify="space-between">
        <div>
          <h1>Generate Chart</h1>
        </div>
        <div></div>
      </Flex>
      <Steps current={current} items={items} />
      <div className="steps-content">{getContent()}</div>
    </>
  );
};

export default Graph;
