import React from "react";
import { View, StyleSheet} from "react-native";
import {RoundedButton} from "../../comp/roundedbutton";

export const Timing = ({ onchangeTime }) => {
  return(
    <>
    <View style = {styles.timingButton}>
      <RoundedButton size={75} title="10" onPress= {() => onchangeTime(10)} />
    </View>
    <View style = {styles.timingButton}>
      <RoundedButton size={75} title="15" onPress= {() => onchangeTime(15)} />
    </View>
    <View style = {styles.timingButton}>
      <RoundedButton size={75} title="20" onPress= {() => onchangeTime(20)} />
    </View>
    </>
  )
}
const styles = StyleSheet.create({
  timingButton:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'

  }
})