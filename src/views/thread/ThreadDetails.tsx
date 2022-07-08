import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Row, Table, Typography } from "web3uikit";
import { Post as PostData, Thread } from "../../api";
import { useApi } from "../../api/useApi";
import { ButtonLink } from "../../components/ButtonLink";
import { ShowOnLogin } from "../../components/ShowOnLogin";
import { NewPost } from "../post/NewPost";
import { Post } from "../post/Post";

export const ThreadDetails: React.FC = () => {
  const { threadId } = useParams();
  const api = useApi();
  const [thread, setThread] = useState<Thread>();
  const [showNewComment, setShowNewComment] = useState(false);

  useEffect(() => {
    if (threadId) {
      api.getThread(+threadId).then((threadData) => {
        setThread(threadData);
      });
    }
  }, [threadId]);

  if (!threadId || !thread) return null;

  const onNewCommentClicked = () => setShowNewComment(true);
  const onNewCommentSubmit = (newComment: PostData) => {
    const updated: Thread = {
      ...thread,
      comments: thread.comments
        ? [...thread.comments, newComment]
        : [newComment],
    };
    setThread(updated);
    setShowNewComment(false);
  };
  const onNewCommentCancel = () => setShowNewComment(false);

  if (!thread.comments) return <Typography>No posts</Typography>;

  return (
    <Row.Col span={24}>
      <>
        <Table
          columnsConfig="12fr"
          header={[<Typography variant="subtitle1">{thread.title}</Typography>]}
          pageSize={5}
          data={thread.comments.map((post) => [
            <Post key={`post-${post.id}`} data={post} />,
          ])}
        />
        <Row>
          <NewPost
            threadId={+threadId}
            show={showNewComment}
            onSubmit={onNewCommentSubmit}
            onCancel={onNewCommentCancel}
          />
          {showNewComment ? (
            <></>
          ) : (
            <ShowOnLogin>
              <Button
                theme="primary"
                text="New Comment"
                onClick={onNewCommentClicked}
              />
            </ShowOnLogin>
          )}
          <ButtonLink
            to="/"
            text="Back to Posts"
            type="button"
            theme="secondary"
            icon="arrowCircleLeft"
          />
        </Row>
      </>
    </Row.Col>
  );
};
