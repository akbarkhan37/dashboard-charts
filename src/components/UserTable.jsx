// src/components/UserTable.js
import React, { useState } from "react";
import styled from "styled-components";
import { exportToCSV } from "../utils/exportCSV"; // CSV export utility

// Table and filter styles
const TableWrapper = styled.div`
  margin-top: 2rem;
  background: #fff;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    cursor: pointer;
    background: #f8f8f8;
  }

  tr:hover {
    background: #f1f1f1;
  }
`;

const FilterSelect = styled.select`
  margin-bottom: 1rem;
  padding: 0.5rem;
`;

const ExportButton = styled.button`
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

// Main Table component
const UserTable = ({ users }) => {
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedCompany, setSelectedCompany] = useState("");

  // Sort and filter the user data based on state
  const sortedUsers = [...users]
    .filter(user => selectedCompany ? user.company.name === selectedCompany : true)
    .sort((a, b) => {
      const aVal = a[sortField]?.toString().toLowerCase();
      const bVal = b[sortField]?.toString().toLowerCase();
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  // Toggle sorting direction and field
  const handleSort = (field) => {
    setSortField(field);
    setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
  };

  // Trigger CSV download
  const handleExport = () => {
    const csvData = sortedUsers.map(user => ({
      Name: user.name,
      Email: user.email,
      Phone: user.phone,
      Company: user.company.name,
      City: user.address.city
    }));
    exportToCSV(csvData, "users.csv");
  };

  // Extract unique companies for filter dropdown
  const companies = [...new Set(users.map(user => user.company.name))];

  return (
    <TableWrapper>
      <h2>User Details</h2>

      <div>
        <FilterSelect value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)}>
          <option value="">All Companies</option>
          {companies.map((comp, index) => (
            <option key={index} value={comp}>{comp}</option>
          ))}
        </FilterSelect>

        <ExportButton onClick={handleExport}>Export CSV</ExportButton>
      </div>

      <StyledTable>
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>Name</th>
            <th onClick={() => handleSort("email")}>Email</th>
            <th onClick={() => handleSort("phone")}>Phone</th>
            <th onClick={() => handleSort("company")}>Company</th>
            <th onClick={() => handleSort("city")}>City</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.company.name}</td>
              <td>{user.address.city}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
};

export default UserTable;
