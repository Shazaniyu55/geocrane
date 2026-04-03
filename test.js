import { io } from "socket.io-client";

const socket = io("http://your-server-url");

// join as police/fire
socket.emit("joinResponder", "police");

// listen for SOS
socket.on("newSOS", (data) => {
  console.log(" New SOS:", data);
});

// listen for station-specific alerts
socket.on("stationAlert", (data) => {
  console.log("Station Alert:", data);
});


await Station.create([
  {
    name: "Lagos Police Station",
    type: "police",
    location: {
      type: "Point",
      coordinates: [3.3792, 6.5244],
      address: "Lagos Island",
    },
  },
  {
    name: "Fire Service Lagos",
    type: "fire",
    location: {
      type: "Point",
      coordinates: [3.35, 6.6],
    },
  },
]);