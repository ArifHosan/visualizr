import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../services/db";
import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Table,
  TableProps,
  notification,
} from "antd";
import React from "react";

type ColumnsType<T> = TableProps<T>["columns"];

const TableView: React.FC = () => {
  let { id } = useParams();
  const [form] = Form.useForm();
  const [columns, setColumns] = useState<ColumnsType<any>>([]);
  const [tableData, setTableData] = useState<any[]>([]);
  const [dirty, setDirty] = useState(false);

  const [api, contextHolder] = notification.useNotification({
    maxCount: 1,
  });

  const csvDataByIdArray = useLiveQuery(
    () => db.csvData.where({ id: Number(id) }).toArray(),
    [id]
  );

  const formatHeading = (heading: string): String => {
    return heading.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [modalData, setModalData] = useState<any>({});
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteModalData, setDeleteModalData] = useState<any>({});
  const showEditModal = (data: any) => {
    setModalData({ ...data });
    form.setFieldsValue(data);
    setIsEditModalVisible(true);
  };
  const handleEditOk = () => {
    const values = form.getFieldsValue();
    const id = modalData.__id;
    setTableData(
      tableData.map((row) => {
        if (row.__id === id) {
          return values;
        }
        return row;
      })
    );
    setDirty(true);
    handleEditCancel();
  };
  const handleEditCancel = () => {
    setModalData({});
    setIsEditModalVisible(false);
  };
  const showDeleteModal = (data: any) => {
    setDeleteModalData({ ...data });
    setIsDeleteModalVisible(true);
  };
  const handleDeleteOk = () => {
    const id = deleteModalData.__id;
    setTableData(tableData.filter((row) => row.__id !== id));
    setDirty(true);
    handleDeleteCancel();
  };
  const handleDeleteCancel = () => {
    setDeleteModalData({});
    setIsDeleteModalVisible(false);
  };

  const addIdToData = (data: any[]) => {
    return data.map((row, index) => {
      return { ...row, __id: index };
    });
  };

  const updateCsvData = async () => {
    if (!id) return;
    const csvData = tableData.map((row) => {
      const { __id, ...rest } = row;
      return rest;
    });
    await db.csvData.update(Number.parseInt(id), {
      data: JSON.stringify(csvData),
    });
    setDirty(false);
    api.success({
      message: "Success",
      description: "CSV data updated successfully",
      placement: "topRight",
    });
  };

  const loadColumns = () => {
    if (csvDataByIdArray && csvDataByIdArray.length > 0) {
      const dataString = csvDataByIdArray[0].data;
      const parsedData = JSON.parse(dataString);
      const parsedDataWithId = addIdToData(parsedData);
      setTableData([...parsedDataWithId]);
      if (parsedDataWithId.length === 0) return;
      const firstRow = parsedDataWithId[0];
      const columns: ColumnsType<any> = Object.keys(firstRow)
        .filter((x) => x != "__id")
        .map((key) => {
          return {
            title: formatHeading(key),
            dataIndex: key,
            key: key,
            editable: true,
            sorter: (a: any, b: any) => {
              if (typeof a[key] === "number") {
                return a[key] - b[key];
              }
              if (typeof a[key] === "string") {
                return a[key].localeCompare(b[key]);
              }
              return 0;
            },
          };
        });
      columns.push({
        title: "Action",
        dataIndex: "action",
        key: "action",
        sorter: false,
        render: (_: any, record: any) => (
          <>
            <Button type="link" onClick={() => showEditModal(record)}>
              Edit
            </Button>
            <Button type="link" danger onClick={() => showDeleteModal(record)}>
              Delete
            </Button>
          </>
        ),
      });
      setColumns(columns);
    }
  };

  useEffect(() => {
    if (csvDataByIdArray) {
      loadColumns();
    }
  }, [csvDataByIdArray]);

  return (
    <>
      {contextHolder}
      <Flex gap="middle" align="center" justify="space-between">
        <div>
          <h1>View & Edit CSV</h1>
        </div>
        <div>
          {dirty && (
            <Button type="primary" onClick={updateCsvData}>
              Update CSV
            </Button>
          )}
        </div>
      </Flex>
      <Flex gap="middle" align="center" justify="space-between">
        <Table
          size="large"
          columns={columns}
          dataSource={tableData}
          rowKey={(record) => record.__id}
          style={{ width: "100%" }}
        ></Table>
      </Flex>
      <Modal
        title="Edit Row"
        open={isEditModalVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
      >
        {modalData && (
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            labelAlign="left"
            initialValues={modalData}
            form={form}
            // layout="horizontal"
          >
            {Object.keys(modalData)
              .filter((x) => x != "__id")
              .map((key) => {
                return (
                  <Form.Item key={key} label={formatHeading(key)} name={key}>
                    <Input />
                  </Form.Item>
                );
              })}
          </Form>
        )}
      </Modal>
      {deleteModalData && (
        <Modal
          title="Delete Row"
          open={isDeleteModalVisible}
          onOk={handleDeleteOk}
          onCancel={handleDeleteCancel}
        >
          <p>Are you sure you want to delete this row?</p>
        </Modal>
      )}
    </>
  );
};
export default TableView;
