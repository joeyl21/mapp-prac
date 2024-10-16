import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const Directory = () => {
  return (
    <View style={ styles.container}>
      <Text>Data Entry</Text>
      
     <TextInput style={ styles.input} placeholder='First Name' />

     <TextInput style={ styles.input} placeholder='Last Name' />

     <TextInput style={ styles.input} placeholder='Phone Number' keyboardType='email-address'/>
    
    </View>

    
  )
}

export default Directory

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: "#fff",
  alignItems: "center",
  justifyContent: "center"
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3

  },
})