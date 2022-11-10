// {/* <script
//   src="https://cdn.socket.io/4.5.3/socket.io.min.js"
//   integrity="sha384-WPFUvHkB1aHA5TDSZi6xtDgkF0wXJcIIxXhC6h8OT8EH3fC5PWro5pWJ1THjcfEi"
//   crossorigin="anonymous"
// ></script> */}

var socket = io.connect("localhost");
socket.on('connected', function (msg) {
  console.log(msg, { io });
  // time.innerText = msg.time;
  // msv.innerText = msg.MSV;
  // lhp.innerText = msg.LHP;
});

export default socket;