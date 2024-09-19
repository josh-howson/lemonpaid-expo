import React from 'react';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Homepage from './app/index';
import OneStepAtATimePage from './app/one-step-at-a-time';
import OnboardNamePage from './app/onboard-name';
import OnboardSalaryPage from './app/onboard-salary';
import OnboardHirePage from './app/onboard-hire';

const Stack = createStackNavigator();

function MainApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Homepage">
        <Stack.Screen 
          name="Homepage" 
          component={Homepage} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="OneStepAtATime" 
          component={OneStepAtATimePage} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="OnboardNamePage" 
          component={OnboardNamePage} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="OnboardSalaryPage" 
          component={OnboardSalaryPage} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="OnboardHirePage" 
          component={OnboardHirePage} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return <MainApp />;
}

registerRootComponent(App);
