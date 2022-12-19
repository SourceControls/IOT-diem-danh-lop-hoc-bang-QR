export default function getQRSrc(IDBUOIHOC, IDLSV, size) {
  return new Promise(async (resolve, reject) => {
    var deviceIP = await fetch('https://api.ipify.org?format=json')
      .then((res) => res.json())
      .then((res) => res.ip);

    var serverIP = await fetch('http://localhost:8080/site/getServerIP')
      .then((res) => res.json())
      .then((res) => res.data);
    navigator.geolocation.getCurrentPosition(function (p) {
      resolve({ lat: p.coords.latitude, lng: p.coords.longitude, deviceIP, serverIP });
      // resolve({ lat: 10.848098, lng: 106.786521, deviceIP, serverIP });

    }, (e) => {
      // alert(e.message)
      resolve({ lat: 10.848098, lng: 106.786521, deviceIP, serverIP });
    });
  }).then((p) => {
    // https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=192.168.0.1__BUOI01__LSV01__116.108.92.248__10.846578802035475__106.79880896438867
    return (
      `https://api.qrserver.com/v1/create-qr-code/?` +
      `size=${size}x${size}&` +
      `data=${p.serverIP}__${IDBUOIHOC}__${IDLSV}__${p.deviceIP}__${p.lat}__${p.lng}`
    );
  });
}