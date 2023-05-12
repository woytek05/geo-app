import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomePage from "./components/WelcomePage";
import Main from "./components/Main";
import Map from "./components/Map";
import COLORS from "./Styles/Colors";

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="welcomePage"
                    component={WelcomePage}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="main"
                    component={Main}
                    options={{
                        title: "Main",
                        headerStyle: {
                            backgroundColor: COLORS.darkPrimaryColor,
                        },
                        headerTintColor: COLORS.white,
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />
                <Stack.Screen
                    name="map"
                    component={Map}
                    options={{
                        title: "Map",
                        headerStyle: {
                            backgroundColor: COLORS.darkPrimaryColor,
                        },
                        headerTintColor: COLORS.white,
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
