(function () {
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var parts = cookies[i].trim().split("=");
    if (parts[0] === "var-card-theme") {
      if (parts[1] === "dark" || parts[1] === "light") {
        document.documentElement.setAttribute("data-theme", parts[1]);
      }
      break;
    }
  }
})();
