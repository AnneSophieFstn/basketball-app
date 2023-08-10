import { StatusBar } from "expo-status-bar";
import Router from "./src/navigation/Router.js";

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Router />
    </>
  );
}
