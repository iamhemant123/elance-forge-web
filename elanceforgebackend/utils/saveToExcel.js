import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CSV File Path
const csvFilePath = path.join(
  __dirname,
  "../data/contacts.csv"
);

/*
  Important:
  CSV storage is mainly for local backup.
  MongoDB remains the primary database.
*/

// Ensure Data Folder Exists
const ensureDirectory = async () => {
  try {
    await fs.promises.mkdir(
      path.dirname(csvFilePath),
      {
        recursive: true,
      }
    );
  } catch { }
};

// Make CSV Values Safe
const formatCSVValue = (value = "") => {
  return `"${String(value)
    .replace(/"/g, '""')
    .replace(/\n/g, " ")}"`;
};

// Save Contact Data
const saveToExcel = async (contactData) => {
  try {
    await ensureDirectory();

    // Create File Header
    if (!fs.existsSync(csvFilePath)) {
      await fs.promises.writeFile(
        csvFilePath,

        "Name,Email,Company,Subject,Message,Status,Date\n",

        "utf8"
      );
    }

    // Create CSV Row
    const csvRow =
      [
        formatCSVValue(contactData.name),

        formatCSVValue(contactData.email),

        formatCSVValue(contactData.company || ""),

        formatCSVValue(contactData.subject),

        formatCSVValue(contactData.message),

        formatCSVValue(contactData.status || "new"),

        formatCSVValue(
          new Date().toLocaleString("en-IN")
        ),
      ].join(",") + "\n";

    // Append Data
    await fs.promises.appendFile(
      csvFilePath,
      csvRow
    );

  } catch (error) {
    console.error(
      "CSV Save Error :",
      error.message
    );
  }
};

export default saveToExcel;