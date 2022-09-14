import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ButtonProps {
  title: string;
}

function Button(props: ButtonProps) {
  return (
    <TouchableOpacity>
      <Text>{props.title}</Text>
    </TouchableOpacity>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
      <Button title="Hello" />
      <Button title="Manow" />
      <Button title="Mala dms" />
      <Button title="C tá doidoo." />

      <StatusBar style="auto" />
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
});
