export default function getQRSrc(IDBUOIHOC, IDLSV, size) {
  return new Promise(async (resolve, reject) => {
    var deviceIP = await fetch('https://api.ipify.org?format=json')
      .then((res) => res.json())
      .then((res) => res.ip);
    navigator.geolocation.getCurrentPosition((p) => {
      resolve({ lat: p.coords.latitude, lng: p.coords.longitude, deviceIP });
    }, e => {
      //vị trí của trường học
      resolve({ lat: 10.848085, lng: 106.786452, deviceIP });
    });
  }).then((p) => {
    // https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=IDBUOIHOC__IDLSV__116.108.92.248__10.846578802035475__106.79880896438867
    return (
      `https://api.qrserver.com/v1/create-qr-code/?` +
      `size=${size}x${size}&` +
      `data=${IDBUOIHOC}__${IDLSV}__${p.deviceIP}__${p.lat}__${p.lng}`
    );
  });
}