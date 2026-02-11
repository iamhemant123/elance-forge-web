const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/contacts.csv");

// CSV header (sirf ek baar)
if (!fs.existsSync(filePath)) {
      fs.writeFileSync(
            filePath,
            "Name,Email,Company,Subject,Message,Date\n",
            "utf8"
      );
}

// CSV-safe value function
const csvSafe = (value = "") => {
      return `"${String(value).replace(/"/g, '""').replace(/\n/g, " ")}"`;
};

const saveToExcel = (data) => {
      const row = [
            csvSafe(data.name),
            csvSafe(data.email),
            csvSafe(data.company),
            csvSafe(data.subject),
            csvSafe(data.message),
            csvSafe(new Date().toLocaleString("en-IN")),
      ].join(",") + "\n";

      // async write (no file lock)
      fs.appendFile(filePath, row, (err) => {
            if (err) {
                  console.error("CSV write error:", err.message);
            }
      });
};

module.exports = saveToExcel;
