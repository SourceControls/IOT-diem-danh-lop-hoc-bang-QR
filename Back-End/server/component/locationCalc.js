

//p1 là vị trí của giảng viên, p2 là sinh viên
function haversine_distance(p1, p2) {
  //hàm tính toán khoảng cách giữa 2 điểm trên bản đồ, trả về khoảng cách mét
  //độ lệch 10-15 mét

  // vị trí của 230/14 Man Thiện
  var p2;
  var R = 6371071 // Tính toán theo đơn vị mét  6371,071 là ki-lô-mét
  var rlat1 = p1.lat * (Math.PI / 180); // Convert degrees to radians
  var rlat2 = p2.lat * (Math.PI / 180); // Convert degrees to radians
  var difflat = rlat2 - rlat1; // Radian difference (latitudes)
  var difflon = (p2.lng - p1.lng) * (Math.PI / 180); // Radian difference (longitudes)

  var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
  console.log(d);
  return d;
}


module.exports = haversine_distance;