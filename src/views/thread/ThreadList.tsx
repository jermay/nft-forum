import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Row, Table, Typography } from "web3uikit";
import { Thread } from "../../api";
import { useApi } from "../../api/useApi";

const TableWrapper = styled.div`
  margin-top: 10px;
`;

export const ThreadList = () => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const api = useApi();

  useEffect(() => {
    api
      .getThreads()
      .then((data) => setThreads(data || []))
      .catch(() => setThreads([]));
  }, []);

  const createThreadItem = (thread: Thread) => {
    return [
      <Typography>
        <Link to={`/thread/${thread.id}`}>{thread.title}</Link>
      </Typography>,
    ];
  };

  return (
    <Row.Col span={24}>
      <TableWrapper>
        <Table
          columnsConfig="3fr"
          header={[<span>Title</span>]}
          pageSize={10}
          data={threads.map(createThreadItem)}
          customNoDataText="Be the first to start a new topic!"
        />
      </TableWrapper>
    </Row.Col>
  );
};
