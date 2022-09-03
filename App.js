import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import io from "socket.io-client";

// Replace this URL with your own socket-io host, or start the backend locally
const socketEndpoint = " https://da94-197-210-84-219.eu.ngrok.io ";

// const socketEndpoint = fetch("http://localhost:3000").then(req => req.text()).then(console.log)


export default function App() {
  const [hasConnection, setConnection] = useState(false);
  const [time, setTime] = useState(null);

  useEffect(

    //var socket = io(); is what is needed to create a connection on the client side
    //The transport websocket is to connect from the client to the server using websocket
    function didMount() {
        const socket = io(socketEndpoint, {
          transports: ["websocket"],
    });

    socket.io.on("open", () => setConnection(true));
    socket.io.on("close", () => setConnection(false));

    socket.on("time-msg", (data) => {
      setTime(new Date(data.time).toString());
    });

    return function didUnmount() {
      socket.disconnect();
      socket.removeAllListeners();
    };
  }, []);
  // The [] in useEffect is to prevent it from running(looping) continously
  // Try to remove it and see what happens
  // The return function is to prevent memory leaks, it is used to end the function/program
  //   that is running in the useEffect()

  return (
    <View style={styles.container}>

      {/* This is Called Conditional Rendering {condtion && ( <> Your Code</> ) } */}
      {/* It would render only if the condition is true, don't forget how it is written above */}
      {/* Would add Reference Link here */}

      {!hasConnection && (
        <>
          <Text style={styles.paragraph}>
            Connecting to {socketEndpoint}...
          </Text>
          <Text style={styles.footnote}>
            Make sure the backend is started and reachable
          </Text>
        </>
      )}

      {hasConnection && (
        <>
          <Text style={[styles.paragraph, { fontWeight: "bold" }]}>
            Server time
          </Text>
          <Text style={styles.paragraph}>{time}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  paragraph: {
    fontSize: 16,
  },
  footnote: {
    fontSize: 14,
    fontStyle: "italic",
  },
});