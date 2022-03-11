let DefaultEndpoint = "";
DefaultEndpoint = "http://localhost:5000";
if (window.location.hostname === "65.2.34.111") {
  DefaultEndpoint = "http://" + window.location.hostname + ":5000";
}

export { DefaultEndpoint };
