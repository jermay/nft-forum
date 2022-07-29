import React from "react";
import { Avatar, Row, Typography } from "web3uikit";
import styled from "styled-components";
import { PostDto } from "../../api/swagger";

export type PostProps = {
  data: PostDto;
};

const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
`;

export const Post: React.FC<PostProps> = ({ data: { Author, content } }) => {
  return (
    <>
      <Row.Col span={1}>
        <Avatar isRounded size={36} theme="image" image={Author.avatarUrl} />
      </Row.Col>
      <Row.Col span={23}>
        <PostWrapper>
          <Typography>{Author.username}</Typography>
          <Typography>{content}</Typography>
        </PostWrapper>
      </Row.Col>
    </>
  );
};
