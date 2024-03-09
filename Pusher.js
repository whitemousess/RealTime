import Pusher from "pusher-js/react-native";

const pusher = new Pusher("a879d4d4cfc48cfc026b", {
  cluster: "ap1",
  encrypted: true,
});

export default pusher;
