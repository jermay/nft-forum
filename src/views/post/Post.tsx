import React from "react";
import { Avatar, Row, Typography } from "web3uikit";
import styled from "styled-components";
import { Post as PostData } from "../../api";

export type PostProps = {
  data: PostData;
};

const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
`;

export const Post: React.FC<PostProps> = ({ data: { author, content } }) => {
  return (
    <>
      <Row.Col span={1}>
        <Avatar isRounded size={36} theme="image" />
      </Row.Col>
      <Row.Col span={23}>
        <PostWrapper>
          <Typography>{author}</Typography>
          <Typography>{content}</Typography>
        </PostWrapper>
      </Row.Col>
    </>
  );
};
