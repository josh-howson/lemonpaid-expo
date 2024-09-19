import React from 'react';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Homepage from './app/index';
import OnboardBegin from './app/onboard/begin';
import OneStepAtATimePage from './app/onboard/one-step-at-a-time';
import OnboardNamePage from './app/onboard/name';
import OnboardSalaryPage from './app/onboard/salary';
import OnboardHirePage from './app/onboard/hire';
import OnboardRemindersPage from './app/onboard/reminders';
import OnboardAllSetPage from './app/onboard/all-set';
import { StatusBar } from 'expo-status-bar';

const Stack = createStackNavigator();

function MainApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnboardBegin">
        <Stack.Screen 
          name="Homepage" 
          component={Homepage} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="OnboardBegin" 
          component={OnboardBegin} 
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
        <Stack.Screen 
          name="OnboardRemindersPage" 
          component={OnboardRemindersPage} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="OnboardAllSetPage" 
          component={OnboardAllSetPage} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <StatusBar hidden />
    </NavigationContainer>
  );
}

export default function App() {
  return <MainApp />;
}

registerRootComponent(App);
