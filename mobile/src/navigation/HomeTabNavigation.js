import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import Home from "../screens/Home";
import Matchs from "../screens/matchs/Matchs.js";
import Maps from "../screens/carte/Maps.js";
import Evenements from "../screens/evenements/Evenements.js";
import Terrains from "../screens/terrains/Terrains";
import Profil from "../screens/profile/Profil";

const Tab = createBottomTabNavigator();

function HomeTabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Carte"
      labelStyle={{ fontSize: 12 }}
      style={{ backgroundColor: "white" }}
    >
      <Tab.Screen
        name="Terrains"
        component={Terrains}
        options={{
          headerTitleAlign: "center",
          tabBarLabel: "Terrains",
          tabBarIcon: ({ color }) => (
            <Ionicons name="basketball" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Matchs"
        component={Matchs}
        options={{
          headerTitleAlign: "center",
          tabBarLabel: "Matchs",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="basketball-hoop"
              size={24}
              color="black"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Carte"
        component={Maps}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="google-maps"
              size={24}
              color="black"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Evenements"
        component={Evenements}
        options={{
          headerTitleAlign: "center",
          tabBarLabel: "Evenements",
          tabBarIcon: ({ color }) => (
            <Ionicons name="calendar" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Profil"
        component={Profil}
        options={{
          headerTitleAlign: "center",
          tabBarLabel: "Profil",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-circle" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default HomeTabNavigation;
