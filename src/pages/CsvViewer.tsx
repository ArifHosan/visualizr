import { CaretRightOutlined } from "@ant-design/icons";
import { Button, UploadFile } from "antd";
import { useEffect, useState } from "react";

type Props = {
  csvFile: UploadFile | null;
  onNext: () => void;
  onPrev: () => void;
};

function CsvViewer({ csvFile, onNext, onPrev }: Props) {
    const [csvData, setCsvData] = useState<string[][]>([]);
  useEffect(() => {
    if (csvFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            const rows = text.split("\n");
            const data = rows.map((row) => row.split(","));
            setCsvData(data);
            console.log(data);
        };
      
    }
  }, [csvFile]);
  return <div>
        <h1>CSV Viewer</h1>
        <pre>
            {JSON.stringify(csvData, null, 2)}
        </pre>
        <Button type="primary" size="large" onClick={onPrev}>
            <CaretRightOutlined /> Prev
          </Button>
          <Button type="primary" size="large" onClick={onNext}>
            <CaretRightOutlined /> Next
          </Button>
  </div>;
}

export default CsvViewer;
