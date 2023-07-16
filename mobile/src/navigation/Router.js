// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeTabNavigation from "./HomeTabNavigation.js";
import OneMatch from "../screens/matchs/OneMatch.js";

const Stack = createNativeStackNavigator();

function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Accueil"
          component={HomeTabNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Match"
          component={OneMatch}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
