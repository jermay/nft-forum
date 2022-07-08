import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Row } from "web3uikit";
import { Header } from "./views/home/Header";
import { Login } from "./views/login/Login";
import { LoginProvider } from "./views/login/LoginContext";
import { Register } from "./views/register/Register";
import { NewThread } from "./views/thread/NewThread";
import { ThreadDetails } from "./views/thread/ThreadDetails";
import { ThreadList } from "./views/thread/ThreadList";

function App() {
  return (
    <LoginProvider>
      <Router>
        <div style={{ padding: "15px" }}>
          <Header />
          <Row>
            <Routes>
              <Route path="/" element={<ThreadList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/thread/new" element={<NewThread />} />
              <Route path="/thread/:threadId" element={<ThreadDetails />} />
            </Routes>
          </Row>
        </div>
      </Router>
    </LoginProvider>
  );
}

export default App;
