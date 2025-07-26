// src/components/Chart.js
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import styled from "styled-components";

// Styled container for the chart with padding and shadow
const ChartContainer = styled.div`
  margin: 2rem 0;
  padding: 1rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

// Bar chart component
const UserChart = ({ users }) => {
  // Prepare chart data: group users by company name
  const companyData = Object.values(
    users.reduce((acc, user) => {
      const company = user.company.name;
      acc[company] = acc[company] || { name: company, users: 0 };
      acc[company].users += 1;
      return acc;
    }, {})
  );

  return (
    <ChartContainer>
      <h2>Users per Company</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={companyData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="users" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default UserChart;
