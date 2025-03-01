import React, { useCallback, useRef, useMemo, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { FlatList, GestureHandlerRootView, Pressable, ScrollView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import BottomSheetView from "@gorhom/bottom-sheet";
import BottomSheetModal from "@gorhom/bottom-sheet";
import { Colors } from "@/constants/Colors";
import { AppConstants, ARCHETYPES, ATTRIBUTES, CARD_TYPES, FRAMETYPES, RACES } from "@/constants/AppConstants";
import { FlashList } from "@shopify/flash-list";
import { Ionicons } from "@expo/vector-icons";




const DATA = [
  {
    type: "str",
    name: "Archetypes",
    items: ARCHETYPES
  },
  {
    type: "str",
    name: "Attributes",
    items: ATTRIBUTES
  },
  {
    type: "str",
    name: "Races",
    items: RACES
  },
  {
    type: "str",
    name: "Types",
    items: CARD_TYPES
  },
  {
    type: "str",
    name: "Frametypes",
    items: FRAMETYPES
  }

]


const News = () => {
  // hooks
  const sheetRef = useRef<BottomSheet>(null);
  
  // variables
  const snapPoints = useMemo(() => ["75%"], []);

  // callbacks
  const handleSheetChange = useCallback((index: number) => {
    console.log("handleSheetChange", index);
  }, []);

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);


  const [attribute, setAttribute] = useState('')
  const [archetype, setArchetype] = useState('')
  const [frametype, setFrametype] = useState('')
  const [race, setRace] = useState('')
  const [type, setType] = useState('')
  const infos = [
    attribute,
    archetype,
    frametype,
    race,
    type
  ]

  // render
  const BottomSheetItem = ({section}: {section: any}) => {
    const [selectedItem, setSelectedItem] = useState('')
    
    const handlePress = (name: string) => {
      setSelectedItem(name == selectedItem ? '' : name)
    }
    
    return (
      <View style={{width: "100%", gap: 10, marginBottom: 10}} >
        <Text style={{fontSize: 28, fontFamily: "LeagueSpartan_600SemiBold", color: Colors.orange}}>{section.name}</Text>
        <FlatList
          data={section.items}
          horizontal={true}          
          keyExtractor={item => item}          
          renderItem={({item}) => {
            return (
                <Pressable 
                  onPress={() => handlePress(item)}
                  style={
                  {
                    paddingHorizontal: 20, 
                    paddingVertical: 10, 
                    backgroundColor: selectedItem == item ? Colors.red : Colors.background, 
                    borderRadius: 4, 
                    marginRight: 10
                  }
                }>
                  <Text style={{color: "white"}} >
                    {item}
                  </Text>
                </Pressable>
              )
            }
          }
        />
      </View>
    )
  }

  return (
    <View style={{flex: 1}} >
      <Pressable onPress={() => handleSnapPress(0)} style={{width: 100, height: 100, backgroundColor: "red"}} >

      </Pressable>
      <BottomSheet
        ref={sheetRef}
        handleStyle={{backgroundColor: Colors.gray, borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomWidth: 1, borderColor: Colors.background}}
        handleIndicatorStyle={{backgroundColor: Colors.orange}}
        snapPoints={snapPoints}        
        backgroundStyle={{backgroundColor: Colors.gray}}
        enableDynamicSizing={false}
        enablePanDownToClose={true}
        onChange={handleSheetChange}
      >
        <View>
          <BottomSheetFlatList          
            data={DATA}
            style={{paddingHorizontal: 20, paddingVertical: 30, marginBottom: 80}}
            keyExtractor={(i) => i.name}
            renderItem={({item}) => {return (<BottomSheetItem section={item} />)}}
            contentContainerStyle={styles.contentContainer}
          />
          <Pressable style={{position: 'absolute', right: 20, top: 10}} >
            <Ionicons name="refresh-circle" size={36} color={Colors.orange} />
          </Pressable>
        </View>
      </BottomSheet>
      
    </View>    
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
  },
  contentContainer: {
    backgroundColor: Colors.gray,
  },
  itemContainer: {
    padding: 6,
    margin: 6
  },
});

export default News;