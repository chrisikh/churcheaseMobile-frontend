import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAppContext } from "@/context/appContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Login from "@/app/(tabs)/Login";
import {
  StatusBar,
  Platform,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import CustomHeaderTitle2 from "@/components/CustomHeaderTitle2";
import Home from "@/app/(tabs)/Home";
import Prayer from "@/app/(tabs)/Prayer";
import Giving from "@/app/(tabs)/Giving";
import Testimony from "@/app/(tabs)/Testimony";
import FamilyCheckin from "@/app/(tabs)/FamilyCheckin";
import Profile from "@/app/(tabs)/Profile";
import Forms from "@/app/(tabs)/Forms";
import Livestream from "@/app/(tabs)/Livestream";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Colors from "@/constants/MyColors";
import CustomHeaderTitle from "@/components/CustomHeaderTitle";
import MenuModal from "../MenuModal";
import Menu from "@/app/(tabs)/MenuScreen";
import Volunteer from "@/app/(tabs)/Volunteer";
import ChangePassword from "@/app/(tabs)/ChangePassword";
import ForgotPassword from "@/app/(tabs)/forgotPassword";
import GrowthPlanner from "@/app/(tabs)/GrowthPlanner";
import LearningCenter from "@/app/(tabs)/LearningCenter";
import MyLearnings from "@/app/(tabs)/MyLearnings";
import Events from "@/app/(tabs)/Events";
import Announcements from "@/app/(tabs)/Announcements";
import Support from "@/app/(tabs)/Support";
import FormInput from "@/app/(tabs)/FormInput";
import MyVolunteerExpression from "@/app/(tabs)/MyVolunteerExpression";
import LearningDetails from "@/app/(tabs)/LearningDetails";
import VideoPlayer from "@/app/(tabs)/VideoPlayer";
import Notification from "@/app/(tabs)/Notification";
import GrowthPlannerInput from "@/app/(tabs)/GrowthPlannerInput";
import GrowthPlannerInProgress from "@/app/(tabs)/GrowthPlannerInProgress";
import GrowthPlannerCompleted from "@/app/(tabs)/GrowthPlannerCompleted";
import VolunteerList from "@/app/(tabs)/VolunteerList";
import Devotional from "@/app/(tabs)/Devotional";
import DevotionalDetails from "@/app/(tabs)/DevotionalDetails";
import StreamedServices from "@/app/(tabs)/StreamedServices";
import WatchLivestream from "@/app/(tabs)/WatchLivestream";
import WatchStreamedService from "@/app/(tabs)/WatchStreamedService";
import FamilyCheckinForm from "@/app/(tabs)/FamilyCheckinForm";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerLeft: ({ onPress }) => (
          <Icon name="arrow-left" size={24} color="black" onPress={onPress} />
        ),
        headerTintColor: "white",
        contentStyle: { backgroundColor: "white" },
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login} // Assuming LoginScreen is imported or defined elsewhere
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword} // Assuming LoginScreen is imported or defined elsewhere
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  console.log("auth stack is working");
  return (
    <Stack.Navigator
      initialRouteName="HomeTabs"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary, // Set your desired color here
          color: "white",
        },
        headerTintColor: "white", // This sets the color of the back button and title
      }}
    >
      <Stack.Screen
        name="HomeTabs"
        component={HomeTabs} // Assuming HomeTabs is a Tab Navigator defined elsewhere
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Prayer"
        component={Prayer} // Assuming ExploreScreen is imported or defined elsewhere
        options={({ navigation }) => ({
          title: "Prayer Request",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerTintColor: "white",
          headerTitleAlign: "center",
        })}
      />

      <Stack.Screen
        name="VolunteerList"
        component={VolunteerList} // Assuming ExploreScreen is imported or defined elsewhere
        options={({ navigation }) => ({
          title: "Volunteering Information",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerTintColor: "white",
          headerTitleAlign: "center",
        })}
      />

      <Stack.Screen
        name="WatchStreamedService"
        component={WatchStreamedService} // Assuming ExploreScreen is imported or defined elsewhere
        options={({ navigation }) => ({
          title: "Watch Streamed Service",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerTintColor: "white",
          headerTitleAlign: "center",
        })}
      />

      <Stack.Screen
        name="FamilyCheckinForm"
        component={FamilyCheckinForm} // Assuming ExploreScreen is imported or defined elsewhere
        options={({ navigation }) => ({
          title: "Check In",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerTintColor: "white",
          headerTitleAlign: "center",
        })}
      />

      <Stack.Screen
        name="WatchLivestream"
        component={WatchLivestream} // Assuming ExploreScreen is imported or defined elsewhere
        options={({ navigation }) => ({
          title: "Live",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerTintColor: "white",
          headerTitleAlign: "center",
        })}
      />

      <Stack.Screen
        name="StreamedServices"
        component={StreamedServices} // Assuming ExploreScreen is imported or defined elsewhere
        options={({ navigation }) => ({
          title: "Streamed Services",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerTintColor: "white",
          headerTitleAlign: "center",
        })}
      />

      <Stack.Screen
        name="Devotional"
        component={Devotional} // Assuming ExploreScreen is imported or defined elsewhere
        options={({ navigation }) => ({
          title: "Devotional",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerTintColor: "white",
          headerTitleAlign: "center",
        })}
      />

      <Stack.Screen
        name="DevotionalDetails"
        component={DevotionalDetails} // Assuming ExploreScreen is imported or defined elsewhere
        options={({ navigation }) => ({
          title: "Message",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerTintColor: "white",
          headerTitleAlign: "center",
        })}
      />

      <Stack.Screen
        name="GrowthPlannerCompleted"
        component={GrowthPlannerCompleted} // Assuming ExploreScreen is imported or defined elsewhere
        options={({ navigation }) => ({
          title: "Completed",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerTintColor: "white",
          headerTitleAlign: "center",
        })}
      />
      <Stack.Screen
        name="GrowthPlannerInProgress"
        component={GrowthPlannerInProgress} // Assuming ExploreScreen is imported or defined elsewhere
        options={({ navigation }) => ({
          title: "In Progress",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerTintColor: "white",
          headerTitleAlign: "center",
        })}
      />

      <Stack.Screen
        name="LearningDetails"
        component={LearningDetails} // Assuming ExploreScreen is imported or defined elsewhere
        options={({ navigation }) => ({
          title: "Course Information",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerTintColor: "white",
          headerTitleAlign: "center",
        })}
      />

      <Stack.Screen
        name="FormInput"
        component={FormInput} // Assuming ExploreScreen is imported or defined elsewhere
        options={({ navigation }) => ({
          title: "Complete Form",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerTintColor: "white",
          headerTitleAlign: "center",
        })}
      />
      <Stack.Screen
        name="GrowthPlannerInput"
        component={GrowthPlannerInput} // Assuming ExploreScreen is imported or defined elsewhere
        options={({ navigation }) => ({
          title: "Complete Planner",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerTintColor: "white",
          headerTitleAlign: "center",
        })}
      />
      <Stack.Screen
        name="Support"
        component={Support} // Assuming ExploreScreen is imported or defined elsewhere
        options={({ navigation }) => ({
          title: "Support",
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerTintColor: "white",
        })}
      />
      <Stack.Screen
        name="VideoPlayer"
        component={VideoPlayer} // Assuming ExploreScreen is imported or defined elsewhere
        options={({ navigation }) => ({
          title: "Video Player",
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerTintColor: "white",
        })}
      />
      <Stack.Screen
        name="Livestream"
        component={Livestream} // Assuming ExploreScreen is imported or defined elsewhere
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerTintColor: "white",
          headerTitleAlign: "center",
        })}
      />
      <Stack.Screen
        name="GrowthPlanner"
        component={GrowthPlanner} // Assuming ExploreScreen is imported or defined elsewhere
        options={({ navigation }) => ({
          title: "Growth Planner",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerTintColor: "white",
          headerTitleAlign: "center",
        })}
      />
      <Stack.Screen
        name="Announcements"
        component={Announcements} // Assuming ExploreScreen is imported or defined elsewhere
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerTintColor: "white",
          headerTitleAlign: "center",
        })}
      />
      <Stack.Screen
        name="MyLearnings"
        component={MyLearnings} // Assuming ExploreScreen is imported or defined elsewhere
        options={({ navigation }) => ({
          title: "My Learnings",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerTintColor: "white",
          headerTitleAlign: "center",
        })}
      />
      <Stack.Screen
        name="LearningCenter"
        component={LearningCenter} // Assuming ExploreScreen is imported or defined elsewhere
        options={({ navigation }) => ({
          title: "Learning Center",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerTintColor: "white",
          headerTitleAlign: "center",
        })}
      />
      <Stack.Screen
        name="Events"
        component={Events} // Assuming ExploreScreen is imported or defined elsewhere
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Volunteer"
        component={Volunteer} // Assuming ExploreScreen is imported or defined elsewhere
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerTintColor: "white",
          headerTitleAlign: "center",
        })}
      />
      <Stack.Screen
        name="MyVolunteerExpression"
        component={MyVolunteerExpression} // Assuming ExploreScreen is imported or defined elsewhere
        options={({ navigation }) => ({
          title: "My Volunteer Expression",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerTintColor: "white",
          headerTitleAlign: "center",
        })}
      />
      <Stack.Screen
        name="Testimony"
        component={Testimony} // Make sure this component is imported correctly
        options={({ navigation }) => ({
          title: "Testimony",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerTintColor: "white",
          headerTitleAlign: "center",
        })}
      />
      <Stack.Screen
        name="FamilyCheckin"
        component={FamilyCheckin} // Assuming ExploreScreen is imported or defined elsewhere
        options={({ navigation }) => ({
          title: "Check In",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerTintColor: "white",
          headerTitleAlign: "center",
        })}
      />
      <Stack.Screen
        name="Profile"
        component={Profile} // Assuming ExploreScreen is imported or defined elsewhere
        options={({ navigation }) => ({
          title: "Profile",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerTintColor: "white",
          headerTitleAlign: "center",
        })}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword} // Assuming ExploreScreen is imported or defined elsewhere
        options={({ navigation }) => ({
          title: "Change Password",
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerTintColor: "white",
        })}
      />
      <Stack.Screen
        name="Forms"
        component={Forms} // Assuming ExploreScreen is imported or defined elsewhere
        options={({ navigation }) => ({
          title: "Forms",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerTintColor: "white",
          headerTitleAlign: "center",
        })}
      />
    </Stack.Navigator>
  );
}

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitle: () => {
          if (route.name === "Home") {
            return <CustomHeaderTitle />;
          } else {
            return <CustomHeaderTitle2 routeName={route.name} />;
          }
        },
        headerStyle: {
          backgroundColor: "#243060",
          height: 95,
        },
        headerTintColor: "white",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Announcements":
              iconName = focused ? "bullhorn" : "bullhorn-outline";
              break;
            case "Events":
              iconName = focused ? "calendar-month" : "calendar-month-outline";
              break;
            case "Menu":
              iconName = focused ? "menu" : "menu";
              break;
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarStyle: [
          {
            display: "flex",
          },
          Platform.select({
            ios: {
              height: 80,
              paddingBottom: 30,
            },
            android: {
              height: 60,
              paddingBottom: 15,
            },
          }),
        ],
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Announcements" component={Announcements} />
      <Tab.Screen name="Events" component={Events} />
      <Tab.Screen name="Menu" component={Menu} />
    </Tab.Navigator>
  );
};

// function Navigation() {
//   const [token, setToken] = useState(null);
//   useEffect(() => {
//     const fetchToken = async () => {
//       try {
//         const storedToken = await AsyncStorage.getItem("token");
//         if (storedToken) {
//           setToken(storedToken);
//         }
//       } catch (error) {
//         console.log("Failed to fetch the token from AsyncStorage:", error);
//       }
//     };

//     fetchToken();
//   }, []);

//   return (
//     <NavigationContainer independent={true}>
//       <StatusBar barStyle="light-content" backgroundColor="#243060" />
//       {token ? <AuthenticatedStack /> : <AuthStack />}
//     </NavigationContainer>
//   );
// }

function Navigation() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.log("Failed to fetch the token from AsyncStorage:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#243060" />
      </View>
    );
  }

  return (
    <NavigationContainer independent={true}>
      <StatusBar barStyle="light-content" backgroundColor="#243060" />
      {token ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default Navigation;
