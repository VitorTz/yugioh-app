import { router } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppStyle from '@/constants/AppStyle';
import { Colors } from '@/constants/Colors';

export default function NotFoundScreen() {
  return (
    <>
      <SafeAreaView style={AppStyle.safeArea}>
        <Text style={styles.text}>Not Found</Text>
        <Text>The page you are looking for does not exist.</Text>
        <Pressable hitSlop={{top: 20, bottom: 20, left: 20, right: 20}} onPress={() => router.replace("/(tabs)/home")}>
          <Text style={{textDecorationLine: "underline", color: Colors.pinkAccent, marginTop: 20}} >go back home</Text>
        </Pressable>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    color: Colors.text,
    fontSize: 48
  }
});
