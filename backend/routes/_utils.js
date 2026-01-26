import fs from "fs";
import path from "path";

const __dirname = path.resolve();

// Helper to read JSON file
export const readJSON = (filename) => {
  const filePath = path.join(__dirname, "..", "data", filename);
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

// Helper to write JSON file
export const writeJSON = (filename, data) => {
  const filePath = path.join(__dirname, "..", "data", filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
};
