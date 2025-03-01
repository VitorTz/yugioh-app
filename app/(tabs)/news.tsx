import React, { useCallback, useRef, useMemo, useState, useEffect } from "react";
import { StyleSheet, Pressable, ScrollView, Keyboard, TextInput, View, Text, Button } from "react-native";
import BottomSheet, { BottomSheetFlatList, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import CategoryFilter from "@/components/CategoryFilter";
import { AppConstants, ARCHETYPES, ATTRIBUTES, CARD_TYPES, FRAMETYPES, RACES } from "@/constants/AppConstants";
import { NumberFilterType } from "@/helpers/types";
import NumberFilter from "@/components/NumberFilter";


const News = () => {
  // hooks
  const sheetRef = useRef<BottomSheet>(null);
  
  const snapPoints = useMemo(() => ["50%"], []);

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);    
  }, []);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
    Keyboard.dismiss()
  }, []);

  const [archetype, setArchetype] = useState<string | null>(null)
  const [attribute, setAttribute] = useState<string | null>(null)
  const [frametype, setFrametype] = useState<string | null>(null)
  const [race, setRace] = useState<string | null>(null)
  const [type, setType] = useState<string | null>(null)
  const [level, setLevel] = useState<NumberFilterType>({number: '', comp: null})
  const [attack, setAttack] = useState<NumberFilterType>({number: '', comp: null})
  const [defence, setDefence] = useState<NumberFilterType>({number: '', comp: null})  

  
  const handleResetFilters = () => {
    setArchetype(null)
    setAttribute(null)
    setFrametype(null)
    setRace(null)
    setType(null)
    setLevel({number: '', comp: null})
    setAttack({number: '', comp: null})
    setDefence({number: '', comp: null})
    Keyboard.dismiss()
  }


  return (
    <View style={{flex: 1}} >
      <Pressable onPress={() => handleSnapPress(0)} style={{width: 100, height: 100, backgroundColor: "red"}}/>      
      <Pressable onPress={() => handleClosePress()} style={{width: 100, height: 100, backgroundColor: "red"}}/>

      <BottomSheet
        ref={sheetRef}
        index={-1}        
        handleStyle={{}}
        handleIndicatorStyle={{display: "none"}}
        snapPoints={snapPoints}       
        containerStyle={{marginBottom: 60, paddingBottom: 40}}
        backgroundStyle={{backgroundColor: Colors.gray}}
        enableDynamicSizing={false}   
        enableContentPanningGesture={false}
      >
        <View>
          <BottomSheetScrollView 
            style={{width: '100%', padding: 20}}
            keyboardShouldPersistTaps={"handled"}>
            <View style={{flexDirection: "row", gap: 20, alignItems: "center", justifyContent: "space-between"}} >
              <Pressable onPress={() => handleClosePress()} hitSlop={AppConstants.hitSlopLarge}>
                <Ionicons name='close-circle-outline' size={36} color={Colors.orange} />
              </Pressable>
              <Pressable onPress={() => handleResetFilters()} hitSlop={AppConstants.hitSlopLarge} >
                <Ionicons name="refresh-circle-outline" size={36} color={Colors.orange} />
              </Pressable>
            </View>
              <NumberFilter filter={level} setFilter={setLevel} title="Level"/>
              <NumberFilter filter={attack} setFilter={setAttack} title="Attack"/>
              <NumberFilter filter={defence} setFilter={setDefence} title="Defence"/>
              <CategoryFilter filter={archetype} setFilter={setArchetype} items={ARCHETYPES} title="Archetypes" />
              <CategoryFilter filter={attribute} setFilter={setAttribute} items={ATTRIBUTES} title="Attributes" />
              <CategoryFilter filter={frametype} setFilter={setFrametype} items={FRAMETYPES} title="Frametypes" />
              <CategoryFilter filter={race} setFilter={setRace} items={RACES} title="Races" />
              <CategoryFilter filter={type} setFilter={setType} items={CARD_TYPES} title="Types" />
              <View style={{width: '100%', height: 40}} ></View>
          </BottomSheetScrollView>
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