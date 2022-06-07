import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Row } from "web3uikit";
import { Header } from "./views/home/Header";
import { NewThread } from "./views/thread/NewThread";
import { ThreadDetails } from "./views/thread/ThreadDetails";
import { ThreadList } from "./views/thread/ThreadList";

function App() {
  return (
    <Router>
      <div style={{ padding: "15px" }}>
        <Header />
        <Row>
          <Routes>
            <Route path="/" element={<ThreadList />} />
            <Route path="/thread/new" element={<NewThread />} />
            <Route path="/thread/:threadId" element={<ThreadDetails />} />
          </Routes>
        </Row>
      </div>
    </Router>
  );
}

export default App;
