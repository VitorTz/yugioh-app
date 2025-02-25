import { StyleSheet, Image, Pressable, Text, View, StatusBar, TextInput} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppStyle from '@/constants/AppStyle'
import { Colors } from '@/constants/Colors'
import CustomStatusBar from '@/components/CustomStatusBar'
import { Ionicons } from '@expo/vector-icons'



const Database = () => {

  return (
    <SafeAreaView style={AppStyle.safeArea}>
      <CustomStatusBar></CustomStatusBar>      
        
        {/* Search bar */}
        <View style={{flexDirection: "row", width: '100%', alignItems: "center"}}>
          <TextInput placeholder='search' placeholderTextColor={"white"} style={AppStyle.searchBar}/>
          <Ionicons style={{position: 'absolute', left: 10}} name='search' size={32} color={Colors.orange}/>
          <Pressable onPress={() => {}} style={{position: 'absolute', right: 10}} hitSlop={{left: 10, right: 10, bottom: 10, top: 10}}>
            <Ionicons name='options-outline' size={32} color={Colors.orange} />
          </Pressable>
        </View>


    </SafeAreaView>
  )
}

export default Database


const styles = StyleSheet.create({
  
})