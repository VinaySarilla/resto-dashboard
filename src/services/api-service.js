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

const healthCheck = async () => {
  let url = `https://shopapp-tv4c.onrender.com/status`;
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

const dunzoStatus = async () => {
  let url = `https://turtlery-dunzo-webhook.onrender.com/status`;
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

const fulfillOrder = async (orderId) => {
  let url = `https://shopapp-tv4c.onrender.com/fulfill/${orderId}`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  }).then((res) => res);
};

export const apiService = {
  updateStatus,
  fulfillOrder,
  healthCheck,
  dunzoStatus,
};
