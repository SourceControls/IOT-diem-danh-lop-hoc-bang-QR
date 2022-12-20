export default function excute(api, data) {
  console.log(JSON.stringify(data));
  return fetch(api, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": '*'
    },
    body: JSON.stringify(data)
  }).then(res => {
    return res.json();
  }).catch(function (err) {
    console.log("Error!! " + err);
    return false;
  });
}