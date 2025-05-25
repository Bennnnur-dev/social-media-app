import { Colors } from "@/constants/colors";
import useContextSnippet from "@/hooks/useContextSnippet";
import { Redirect, Tabs } from "expo-router";
import { Platform } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function TabsLayout() {
  const { context, error } = useContextSnippet();
  if (error) return <Redirect href={`/(utils)/Error?errMsg=${error}`} />;

  const colors = context?.getColors() as Colors;
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: Platform.OS === "ios" ? 40 : 50,
          paddingTop: 5,
          backgroundColor: colors.primary,
          borderTopWidth: 0,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => <Icon name={focused ? "home" : "home-outline"} size={30} color={colors.text} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name={focused ? "plus-box" : "plus-box-outline"} size={30} color={colors.text} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name={focused ? "account-circle" : "account-circle-outline"} size={30} color={colors.text} />
          ),
        }}
      />
    </Tabs>
  );
}

//   <Tabs.Screen
//     name="search"
//     options={{
//       tabBarIcon: ({ focused }) => <Icon name={focused ? "cloud-search" : "cloud-search-outline"} size={30} />,
//     }}
//   />
