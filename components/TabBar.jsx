import { View, StyleSheet, Platform, Pressable, TouchableOpacity } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { wp, hp } from '@/helpers/common';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import TabBarButton from './TabBarButton';
import { AppConstants } from '../constants/AppConstants';


const TabBar = ({ state, descriptors, navigation }) => {
    const [focusedColor, baseColor ] = [Colors.orange, Colors.white]
    const { buildHref } = useLinkBuilder();
  
    return (
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;
            
          
          if (AppConstants.notShowTab.includes(route.name)) {
            return null
          }
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };     
          
          return (
            <TabBarButton
              key={route.name}
              href={buildHref(route.name, route.params)}            
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              style={styles.tabBarItem}
              isFocused={isFocused}
              routeName={route.name}
              color={isFocused ? focusedColor : baseColor}
              label={label}
            />
          )
        })}
      </View>
    );
  }


export default TabBar;


const styles = StyleSheet.create({
    container: { 
        marginHorizontal: 16,       
        paddingVertical: 14,
        position: 'absolute',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: Colors.gray,
        borderRadius: 4,
        bottom: 16
    },
    tabBarItem: {
        flex: 1,
        borderRadius: 32,
        justifyContent: "center",
        gap: 4,
        alignItems: "center"
    }
    
})
