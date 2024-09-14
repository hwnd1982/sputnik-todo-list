import { Button, Form, Input, Select } from "antd";
import type { SelectProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useAppStore } from "../../app";

const StatusOptions: SelectProps["options"] = [
  {
    label: "Создана",
    value: "open",
  },
];

export function TaskForm() {
  
  return (
    <Form.Provider
      onFormFinish={async (name, {values, forms}) => {
        await useAppStore.getState().createTask(values.description);
        forms[name].resetFields();
      }}
    >
      <Form
        name="add-new-task"
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          label="Задача"
          name="description"
          rules={[{ required: true, message: "Поле должно быть заполнено!" }]}
        >
          <Input.TextArea
            showCount
            rows={4}
            style={{ resize: "none" }}
            maxLength={500}
            placeholder="Опишите задачу..."
          />
        </Form.Item>

        <Form.Item
          label="Статус"
          name="status"
          tooltip="По умолчанию новой задаче устанавливается статус &laquo;Создана&raquo;"
          rules={[{ required: true, message: "Поле должно быть заполнено!" }]}
          initialValue="open"
        >
          <Select options={StatusOptions} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
            Создать
          </Button>
        </Form.Item>
      </Form>
    </Form.Provider>
  );
}
