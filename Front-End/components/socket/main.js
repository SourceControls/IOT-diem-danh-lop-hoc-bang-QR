// {/* <script
//   src="https://cdn.socket.io/4.5.3/socket.io.min.js"
//   integrity="sha384-WPFUvHkB1aHA5TDSZi6xtDgkF0wXJcIIxXhC6h8OT8EH3fC5PWro5pWJ1THjcfEi"
//   crossorigin="anonymous"
// ></script> */}


var socket = io.connect("localhost:8080");
socket.on('connected', function (msg) {
  console.log(msg, { io });

});


// gửi và nhận vị trí của giảng viên
var MAGV = "GV01";
socket.on('clientLocation', () => {
  navigator.geolocation.getCurrentPosition((p) => {
    console.log({
      lat: p.coords.latitude,
      lng: p.coords.longitude
    });
    socket.emit('clientLocation', {
      MAGV,
      position: {
        lat: p.coords.latitude,
        lng: p.coords.longitude
      }
    });
  })
});
export default socket;