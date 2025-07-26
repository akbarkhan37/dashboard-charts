// src/App.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components"; // ✅ Only styled, no need for createGlobalStyle
import UserChart from "./components/Chart";
import UserTable from "./components/UserTable";
import GlobalStyle from "./styles/GlobalStyle";
// ✅ Global styles

// App container
const AppWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

// Dashboard title
const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: green;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  letter-spacing: 1px;
  text-align: center;
`;

// Main App component
const App = () => {
  const [users, setUsers] = useState([]);

  // Fetch user data from API on component mount
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  return (
    <>
      <GlobalStyle /> {/* Apply global styles */}
      <AppWrapper>
        <Title>📊 User Dashboard</Title>
        <UserChart users={users} />
        <UserTable users={users} />
      </AppWrapper>
    </>
  );
};

export default App
