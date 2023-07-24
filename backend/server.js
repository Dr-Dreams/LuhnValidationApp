const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
const port = 8080;

app.use(bodyParser.json());

// Luhn validation function
function luhnValidate(card_number) {
  let sum = 0;
  let numDigits = card_number.length;
  let parity = numDigits % 2;

  for (let i = 0; i < numDigits; i++) {
    let digit = parseInt(card_number[i]);

    if (i % 2 === parity) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
  }

  return sum % 10 === 0;
}

// post api function
app.post("/api/v1/validate", (req, res) => {
  const { card_number } = req.body;

  if (!card_number || typeof card_number !== "string") {
    return res.status(400).json({ error: "Invalid card provided 😭" });
  }

  // Removing any non-digit characters from the card number
  const cleanedcard_number = card_number.replace(/\D/g, "");

  if (!luhnValidate(cleanedcard_number)) {
    return res.json({ message: "Credit card is invalid 😞" });
  }

  return res.json({ message: "Credit card is valid 😀" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
