const API_KEY = "6VPUY7L38WD5ETT6";

function saveAndFetch() {
  const symbol = document.getElementById("symbol").value.toUpperCase();
  const buyPrice = parseFloat(document.getElementById("buyPrice").value);
  const quantity = parseInt(document.getElementById("quantity").value);

  localStorage.setItem("symbol", symbol);
  localStorage.setItem("buyPrice", buyPrice);
  localStorage.setItem("quantity", quantity);

  fetchPrice();
}

async function fetchPrice() {
  const symbol = localStorage.getItem("symbol");
  const buyPrice = parseFloat(localStorage.getItem("buyPrice"));
  const quantity = parseInt(localStorage.getItem("quantity"));

  if (!symbol || !buyPrice || !quantity) return;

  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const price = parseFloat(data["Global Quote"]["05. price"]);

    const profit = (price - buyPrice) * quantity;
    const totalValue = price * quantity;

    document.getElementById("currentPrice").innerText = price.toFixed(2);
    document.getElementById("profit").innerText = profit.toFixed(2);
    document.getElementById("totalValue").innerText = totalValue.toFixed(2);
    document.getElementById("updated").innerText =
      new Date().toLocaleTimeString();

  } catch (error) {
    console.log(error);
  }
}

window.onload = () => {
  fetchPrice();
  setInterval(fetchPrice, 60000); // update every minute
};
