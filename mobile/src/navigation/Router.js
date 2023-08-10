// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeTabNavigation from "./HomeTabNavigation.js";
import VueCard from "../components/card/VueCard.js";
import AddMatch from "../components/form/matchs/AddMatch.js";
import EditMatch from "../components/form/matchs/EditMatch.js";
import AddEvenement from "../components/form/evenements/AddEvenement.js";
import EditEvenement from "../components/form/evenements/EditEvenement.js";
import DeleteComponent from "../components/card/DeleteComponent.js";

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
          name="VueCard"
          component={VueCard}
          options={{ headerShown: true, headerTitleAlign: "center" }}
        />

        {/* MATCH */}
        <Stack.Screen
          name="Ajouter un match"
          component={AddMatch}
          options={{ headerShown: true, headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="Modifier un match"
          component={EditMatch}
          options={{ headerShown: true, headerTitleAlign: "center" }}
        />
        {/* EVENEMENT */}
        <Stack.Screen
          name="Ajouter un evenement"
          component={AddEvenement}
          options={{ headerShown: true, headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="Modifier un evenement"
          component={EditEvenement}
          options={{ headerShown: true, headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="Supprimer"
          component={DeleteComponent}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
