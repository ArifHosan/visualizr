import { CaretRightOutlined, InboxOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Flex,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { addCsvData } from "../services/indexDbService";

const { Dragger } = Upload;

function UploadCsv() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [fileList, setFileList] = useState<UploadFile<File>[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // const fileList: Array<UploadFile> = [];
  const props: UploadProps = {
    name: "file",
    multiple: false,
    beforeUpload(file) {
      // console.log("Before upload", file);
      fileList.length = 0;
      fileList.push(file);
      setFileList([...fileList]);
      // readFile(file);
      return false;
    },
    listType: "picture",
    showUploadList: {
      showRemoveIcon: false,
    },
    onChange(file) {
      const newFile = file.file as unknown as File;
      setSelectedFile(newFile);
    }
  };
  const readFile = (file: File) => {
    // console.log("Reading file", file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const rows = text.split("\n");
      let header: string[] = [];
      if (checked) {
        header = rows[0].split(",");
        rows.shift();
      } else {
        header = Array.from(
          { length: rows[0].split(",").length },
          (_, i) => `Column ${i + 1}`
        );
      }
      const data = rows.map((row) => {
        const items = row.split(",");
        const obj: any = {};
        header.forEach((h, i) => {
          obj[h] = items[i];
        });
        return obj;
      });
      console.log(data);
      addCsvData({
        fileName: file.name,
        size: file.size || 0,
        type: file.type || "",
        data: JSON.stringify(data),
      });
      navigate("/dashboard", { state: { fromUpload: true }});
    };
    reader.readAsText(file);
  };

  const onNext = () => {
    // onUpload(fileList[0]);
    if (fileList.length == 1 && selectedFile) {
      readFile(selectedFile);
    }
  };
  const onCheck = (e: any) => {
    // console.log(`checked = ${e.target.checked}`);
    setChecked(e.target.checked);
  };

  return (
    <>
      <Flex vertical gap="middle">
        <h1>Upload CSV</h1>
        <div style={{ height: "40vh" }}>
          <Dragger
            {...props}
            className="upload-list-inline"
            fileList={fileList}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag a file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single upload. Strictly prohibit from uploading
              company data or other private files.
            </p>
          </Dragger>
        </div>
        <Flex
          gap="middle"
          align="end"
          vertical
          style={{ padding: 24, marginTop: 50 }}
        >
          <Checkbox onChange={onCheck}>Treat first row as header</Checkbox>
          <Button type="primary" size="large" onClick={onNext}>
            <CaretRightOutlined /> Next
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
export default UploadCsv;
