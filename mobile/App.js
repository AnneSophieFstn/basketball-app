import { StatusBar } from "expo-status-bar";
import Router from "./src/navigation/Router.js";
import { PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <>
      <PaperProvider>
        <StatusBar barStyle="dark-content" />
        <Router />
      </PaperProvider>
    </>
  );
}
