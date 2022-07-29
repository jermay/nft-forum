import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { NotificationProvider, Row } from "web3uikit";
import { MoralisProvider } from "react-moralis";
import styled from "styled-components";
import { Header } from "./views/home/Header";
import { Login } from "./views/login/Login";
import { LoginProvider } from "./views/login/LoginContext";
import { Register } from "./views/register/Register";
import { NewThread } from "./views/thread/NewThread";
import { ThreadDetails } from "./views/thread/ThreadDetails";
import { ThreadList } from "./views/thread/ThreadList";
import { UserProfile } from "./views/profile/UserProfile";

const ContentWrapper = styled.div`
  padding: 15px;
`;

function App() {
  return (
    <MoralisProvider
      appId={import.meta.env.VITE_MORALIS_APP_ID}
      serverUrl={import.meta.env.VITE_MORALIS_APP_URL}
    >
      <LoginProvider>
        <NotificationProvider>
          <Router>
            <ContentWrapper>
              <Header />
              <Row>
                <Routes>
                  <Route path="/" element={<ThreadList />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/profile" element={<UserProfile />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/thread/new" element={<NewThread />} />
                  <Route path="/thread/:threadId" element={<ThreadDetails />} />
                </Routes>
              </Row>
            </ContentWrapper>
          </Router>
        </NotificationProvider>
      </LoginProvider>
    </MoralisProvider>
  );
}

export default App;
