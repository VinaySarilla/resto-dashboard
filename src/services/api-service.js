const updateStatus = async (orderId) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = "";

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  let data = await fetch(
    `https://shopapp-tv4c.onrender.com/updateStatus/${orderId}`,
    requestOptions
  );

  let jsonData = await data.text();
  console.log("data", jsonData);
  return jsonData;
};

const fulfillOrder = async (orderId) => {
  let url = `https://shopapp-tv4c.onrender.com/fulfill/${orderId}`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  }).then((res) => res.json());
};

export const apiService = {
  updateStatus,
  fulfillOrder,
};
