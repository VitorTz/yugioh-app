import { View, StyleSheet } from 'react-native';
import { useLinkBuilder } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';
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
      paddingVertical: 14,      
      position: 'absolute',
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: Colors.gray,        
      bottom: 0
    },
    tabBarItem: {
      flex: 1,      
      justifyContent: "center",      
      alignItems: "center"
  }
    
})
