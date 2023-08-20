import { StatusBar } from "expo-status-bar";
import Router from "./src/navigation/Router.js";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";

export default function App() {
  return (
    <>
      <AutocompleteDropdownContextProvider>
        <StatusBar barStyle="dark-content" />
        <Router />
      </AutocompleteDropdownContextProvider>
    </>
  );
}
