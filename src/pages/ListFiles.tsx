import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../services/db";
import { Button, Card, Col, Flex, Row, notification } from "antd";
import { AreaChartOutlined, DeleteOutlined, EditOutlined, EditTwoTone, UploadOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

function ListFiles() {
  const navigate = useNavigate();
  const location = useLocation();
  const [api, contextHolder] = notification.useNotification({
    maxCount: 1,
  });
  const csvData = useLiveQuery(() => db.csvData.toArray(), []);

  const getRelativeTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) {
      return `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else if (minutes > 0) {
      return `${minutes} minutes ago`;
    } else {
      return `${seconds} seconds ago`;
    }
  };
  const formatFileSize = (size: number) => {
    if (!size) return "----";
    if (size < 1024) {
      return `${size} bytes`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`;
    } else if (size < 1024 * 1024 * 1024) {
      return `${(size / 1024 / 1024).toFixed(2)} MB`;
    } else {
      return `${(size / 1024 / 1024 / 1024).toFixed(2)} GB`;
    }
  };

  const deleteFile = (id: number | undefined) => {
    if (!id) return;
    db.csvData.delete(id);
    api.success({
      message: "Success",
      description: "File deleted successfully",
      placement: "topRight",
    });
  };

  useEffect(() => {
    // console.log(location.state);
    const fromUpload = location.state?.fromUpload as boolean;
    if (fromUpload) {
      api.success({
        message: "Success",
        description: "File uploaded successfully",
        placement: "topRight",
      });
    }
  }, [location.state]);

  return (
    <>
      {contextHolder}
      <Flex gap="middle" align="center" justify="space-between">
        <div>
          <h1>List Files</h1>
        </div>
        <div>
          <Button
            size="large"
            type="primary"
            onClick={() => navigate("/upload-csv")}
          >
            <UploadOutlined /> Upload CSV
          </Button>
        </div>
      </Flex>
      <Row
        gutter={[
          { xs: 0, sm: 16, md: 16, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 32 },
        ]}
      >
        {csvData?.map((file) => {
          return (
            <Col xs={{flex: '100%'}} sm={{flex: '50%'}} lg={{flex: '33%'}} key={file.id} className="gutter-row">
              <Card
                hoverable
                bordered={false}
                title={
                  <Flex justify="space-between">
                    <h4
                    style={{ textOverflow: "ellipsis", overflow: "hidden" }}
                  >
                    {file.fileName}
                  </h4>
                  <EditTwoTone />
                  </Flex>
                }
                actions={[
                  <Button
                    type="primary"
                    onClick={() => navigate(`/generate-graph/${file.id}`)}
                  >
                    <AreaChartOutlined />
                    Plot
                  </Button>,
                  <Button
                    type="primary"
                    danger
                    onClick={() => {
                      deleteFile(file.id);
                    }}
                  >
                    <DeleteOutlined />
                    Delete
                  </Button>,
                ]}
              >
                <Flex
                  vertical
                  justify="space-between"
                  onClick={() => navigate(`/edit-csv/${file.id}`)}
                >
                  <h4>Size: {formatFileSize(file.size)}</h4>
                  <h4>Type: {file.type}</h4>
                  <h4>Uploaded on: {getRelativeTime(file.timestamp || 0)}</h4>
                </Flex>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
}
export default ListFiles;
