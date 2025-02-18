import { StyleSheet, Image, Pressable} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { Colors } from '@/constants/Colors'


const index = () => {  

  return (
    <SafeAreaView style={styles.container} >
        <Pressable onPress={() => router.replace("/(auth)/signin")}>
            <Image source={require("@/assets/images/yugi-icon.png")} style={styles.image}></Image>          
        </Pressable>            
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center", 
    backgroundColor: Colors.background,
    padding: 16
  },
  image: {
    width: 96, 
    height: 96, 
    borderWidth: 3, 
    borderColor: Colors.black, 
    borderRadius: 96    
  }
})