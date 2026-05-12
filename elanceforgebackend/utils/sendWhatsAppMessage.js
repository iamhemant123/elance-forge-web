import axios from "axios";

const sendWhatsAppMessage = async (
  message
) => {
  try {
    await axios.post(
      `https://api.ultramsg.com/${process.env.ULTRAMSG_INSTANCE_ID}/messages/chat`,
      {
        token: process.env.ULTRAMSG_TOKEN,

        to: process.env.ADMIN_WHATSAPP_NUMBER,

        body: message,
      }
    );

    console.log(
      "WhatsApp message sent"
    );

  } catch (error) {
    console.error(
      "WhatsApp Error :",
      error.message
    );
  }
};

export default sendWhatsAppMessage;