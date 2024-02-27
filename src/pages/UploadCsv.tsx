import {
  CaretRightOutlined,
  InboxOutlined,
  NodeExpandOutlined,
} from "@ant-design/icons";
import { Button, Flex, message, Upload, UploadFile, UploadProps } from "antd";

const { Dragger } = Upload;

type Props = {
  onUpload: (file: UploadFile) => void;
}

function UploadCsv({ onUpload }: Props) {
  const fileList: Array<UploadFile> = [];
  const props: UploadProps = {
    name: "file",
    multiple: false,
    // action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    beforeUpload(file) {
      console.log("Before upload", file);
      fileList.length = 0;
      fileList.push(file);
      return false;
    },
    onDrop(e) {
      // console.log("Dropped files", e.dataTransfer.files);
    },
    listType: "picture",
    // fileList: fileList,
    showUploadList: {
      showRemoveIcon: false,
    },
  };

  const onNext = () => {
    onUpload(fileList[0]);
  }

  return (
    <>
      <Flex vertical gap="middle">
        <h1>Home</h1>
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
          <Button type="primary" size="large" onClick={onNext}>
            <CaretRightOutlined /> Next
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
export default UploadCsv;
