import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './components/HomeScreen';
import Composition from './components/Composition';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="主頁">
                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{
                        title: '奇文共欣賞',
                        headerStyle: { backgroundColor: '#5eb69d' },
                        headerTintColor: 'white'
                    }}
                />
                <Stack.Screen
                    name="Composition"
                    component={Composition}
                    options={({ route }) => ({
                        title: route.params.title,
                        headerStyle: { backgroundColor: '#5eb69d' },
                        headerTintColor: 'white'
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
