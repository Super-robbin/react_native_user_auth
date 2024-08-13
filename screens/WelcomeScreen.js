import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../store/auth-context";

// IMPORTANT: Check the realtime database on Firebase to see how to change the rules,
// for example by authorise the backend to only authenticated users.
// We now need to add ?auth=[token] query parameter to the URL
function WelcomeScreen() {
  const [fetchedMessage, setFetchedMessage] = useState("");
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  useEffect(() => {
    axios
      .get(
        `https://react-native-course-5346c-default-rtdb.firebaseio.com/message.json?auth=${token}`
      )
      .then((response) => setFetchedMessage(response.data));
  }, [token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
