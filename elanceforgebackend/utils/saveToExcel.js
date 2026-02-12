import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/* __dirname fix for ES Module */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
 ⚠️ Render / Vercel note:
 Filesystem is ephemeral.
 This CSV is for LOCAL / DEV / TEMP use only.
 MongoDB remains the primary storage.
*/
const filePath = path.join(__dirname, "../data/contacts.csv");

/* Ensure directory exists (no crash) */
const ensureDir = async () => {
  try {
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
  } catch {}
};

/* Make values CSV-safe */
const csvSafe = (value = "") =>
  `"${String(value).replace(/"/g, '""').replace(/\n/g, " ")}"`;

/* Save data to CSV (NON-BLOCKING & SAFE) */
const saveToExcel = async (data) => {
  try {
    await ensureDir();

    /* Create header only if file does not exist */
    if (!fs.existsSync(filePath)) {
      await fs.promises.writeFile(
        filePath,
        "Name,Email,Company,Subject,Message,Date\n",
        "utf8"
      );
    }

    const row =
      [
        csvSafe(data.name),
        csvSafe(data.email),
        csvSafe(data.company || ""),
        csvSafe(data.subject),
        csvSafe(data.message),
        csvSafe(new Date().toLocaleString("en-IN")),
      ].join(",") + "\n";

    await fs.promises.appendFile(filePath, row);
  } catch (error) {
    console.error("CSV write skipped:", error.message);
  }
};

export default saveToExcel;