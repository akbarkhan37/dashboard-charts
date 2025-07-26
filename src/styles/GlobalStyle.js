// src/styles/GlobalStyle.js
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;
  }

  h2 {
    color: #2b4b80;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  h1 {
    color: red;
    font-weight: 600;
  }
`;

export default GlobalStyle;
