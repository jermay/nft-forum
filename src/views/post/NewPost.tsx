import React from "react";
import { Button, Form, Row } from "web3uikit";
import { FormDataReturned } from "web3uikit/dist/components/Form/types";
import { ICreateComment } from "../../api";
import { PostDto } from "../../api/swagger";
import { useApi } from "../../api/useApi";
import { getFormKeyValues } from "../../utils";

export type NewPostProps = {
  threadId: number;
  show: boolean;
  onSubmit: (comment: PostDto) => void;
  onCancel: () => void;
};

export const NewPost: React.FC<NewPostProps> = ({
  threadId,
  show,
  onSubmit,
  onCancel,
}) => {
  const api = useApi();

  const onSave = async (formData: FormDataReturned) => {
    const { content } = getFormKeyValues(formData);
    const comment: ICreateComment = {
      threadId,
      content,
    };
    const post = await api.createComment(comment);
    onSubmit(post);
  };

  if (!show) return null;

  return (
    <Row.Col span={24}>
      <Form
        id="new-thread"
        title="Post a Comment"
        onSubmit={onSave}
        data={[
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
            <Button
              text="Cancel"
              type="button"
              theme="secondary"
              icon="arrowCircleLeft"
              onClick={() => onCancel()}
            />
            <Button type="submit" text="Save" theme="primary" />
          </Row>
        }
      />
    </Row.Col>
  );
};
