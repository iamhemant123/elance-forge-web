const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    company: String,
    subject: String,
    message: String,
  },
  { timestamps: true } // time auto save
);

module.exports = mongoose.model("Contact", contactSchema);
