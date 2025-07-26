// src/utils/exportCSV.js
import { saveAs } from "file-saver";
import Papa from "papaparse";

// Converts JSON data to CSV and downloads it
export const exportToCSV = (data, filename = "data.csv") => {
  const csv = Papa.unparse(data); // Convert JSON to CSV
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" }); // Create Blob
  saveAs(blob, filename); // Trigger download
};