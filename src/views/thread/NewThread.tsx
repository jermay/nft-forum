import { useNavigate } from "react-router-dom";
import { Button, Form, Row, Typography } from "web3uikit";
import { FormDataReturned } from "web3uikit/dist/components/Form/types";
import { ICreateThread } from "../../api";
import { useApi } from "../../api/useApi";
import { ButtonLink } from "../../components/ButtonLink";
import { getFormKeyValues } from "../../utils";

export const NewThread = () => {
  const api = useApi();
  const navigate = useNavigate();

  const onSubmit = async (formData: FormDataReturned) => {
    const values = getFormKeyValues(formData);
    const newThread: ICreateThread = {
      title: values.title,
      content: values.content,
      author: "Guest",
    };
    await api.createThread(newThread);
    navigate("/");
  };

  return (
    <Row.Col span={24}>
      <Form
        id="new-thread"
        title="Create a New Thread"
        onSubmit={onSubmit}
        data={[
          {
            inputWidth: "100%",
            name: "title",
            key: "title",
            type: "text",
            value: "",
          },
          {
            inputWidth: "100%",
            name: "content",
            key: "content",
            type: "textarea",
            value: "",
          },
        ]}
        customFooter={
          <Row>
            <ButtonLink
              to="/"
              text="Cancel"
              type="button"
              theme="secondary"
              icon="arrowCircleLeft"
            />
            <Button type="submit" text="Save" theme="primary" />
          </Row>
        }
      />
    </Row.Col>
  );
};
