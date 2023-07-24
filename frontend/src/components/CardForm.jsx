import { useEffect, useState } from "react";
import axios from "axios";

const CardForm = () => {
  const [message, setMessage] = useState("");
  // card number format implementation
  useEffect(() => {
    const card_input = document.getElementById("card_number");

    const inputHandler = () => {
      const rawValue = card_input.value.replace(/\D/g, "");

      if (rawValue.length >= 4) {
        const formattedValue = `${rawValue.slice(0, 4)}-${rawValue.slice(
          4,
          8
        )}-${rawValue.slice(8, 12)}-${rawValue.slice(12, 16)}`;
        card_input.value = formattedValue;
      } else card_input.value = rawValue;
    };
    card_input.addEventListener("input", inputHandler);

    return () => {
      card_input.removeEventListener("input", inputHandler);
    };
  }, []);

  // expiration date format implementation
  useEffect(() => {
    const expiration_date = document.getElementById("expiration_date");

    const inputHandler = () => {
      const rawValue = expiration_date.value.replace(/\D/g, "");

      if (rawValue.length >= 4) {
        const formattedValue = `${rawValue.slice(0, 2)}/${rawValue.slice(
          2,
          4
        )}`;
        expiration_date.value = formattedValue;
      } else expiration_date.value = rawValue;
    };
    expiration_date.addEventListener("input", inputHandler);

    return () => {
      expiration_date.removeEventListener("input", inputHandler);
    };
  }, []);

  // handling cvv
  useEffect(() => {
    const cvv = document.getElementById("cvv");

    const inputHandler = () => {
      const rawValue = cvv.value.replace(/\D/g, "");

      const formattedValue = `${rawValue.slice(0, 3)}`;
      cvv.value = formattedValue;
    };
    cvv.addEventListener("input", inputHandler);

    return () => {
      cvv.removeEventListener("input", inputHandler);
    };
  }, []);

  const checkHandler = async (event) => {
    event.preventDefault();
    console.log("inside check handler");
    const name_on_card = document.getElementById("name_on_card").value;
    const card_number = document.getElementById("card_number").value;
    const expiration_date = document.getElementById("expiration_date").value;
    const cvv = document.getElementById("cvv").value;
    console.log(name_on_card);
    console.log(card_number);
    console.log(typeof card_number);
    console.log(expiration_date);
    console.log(cvv);

    const jsonData = {
      name_on_card: name_on_card,
      card_number: card_number,
      expiration_date: expiration_date,
      cvv: cvv,
    };

    try {
      const data = await axios.post(
        "http://localhost:8080/api/v1/validate",
        jsonData
      );
      console.log(data);
      console.log(data.data.message);
      setMessage(data.data.message);
    } catch (error) {
      console.log(error.message);
      setMessage("Something went wrong! 😞");
    }
  };

  return (
    <div>
      <form onSubmit={checkHandler}>
        <div className="max-w-md mx-auto bg-gray-100 shadow-md rounded-md overflow-hidden mt-16">
          <div className="bg-blue-600 text-white p-4 flex justify-between">
            <div className="font-bold text-lg">Credit Card</div>
            <div className="text-lg">
              <i className="fab fa-cc-visa"></i>
            </div>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="card_number"
              >
                Card Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="card_number"
                name="card_number"
                type="tel"
                pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}"
                maxLength={19}
                minLength={19}
                inputMode="numeric"
                required
                autoComplete="cc-number"
                placeholder="xxxx xxxx xxxx xxxx"
                onClick={() => setMessage("")}
              />
            </div>
            <div className="mb-4 flex justify-between">
              <div>
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="expiration_date"
                >
                  Expiration Date
                </label>
                <input
                  inputMode="numeric"
                  maxLength={5}
                  required
                  minLength={5}
                  autoComplete="cc-exp"
                  tabIndex={2}
                  pattern="[0-9]{2}/[0-9]{2}"
                  type="tel"
                  className="shadow appearance-none border rounded w-28 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="expiration_date"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="cvv"
                >
                  CVV
                </label>
                <input
                  className="shadow appearance-none border rounded w-24 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="cvv"
                  maxLength={3}
                  minLength={3}
                  required
                  pattern="^\d{3}$"
                  tabIndex={3}
                  onChange={() => handleCVVChange()}
                  inputMode="numeric"
                  aria-label="cvv-value"
                  autoComplete="cc-csv"
                  type="password"
                  placeholder="XXX"
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="name_on_card"
              >
                Name on Card
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name_on_card"
                type="text"
                required
                onKeyDown={(event) => {
                  if (!/[a-zA-Z]/i.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                placeholder="John Doe"
              />
            </div>
            <button
              id="check_buton"
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-full font-bold hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            >
              Check
            </button>
            <div className="text-3xl font-bold text-center my-5">
              <h1>{message}</h1>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CardForm;
