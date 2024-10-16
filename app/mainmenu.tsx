import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native';


const Menu = () => {

    const navigation = useNavigation<NavigationProp<any>>();

    const handleIndicative = () => {
      //code to handle the browse action
      (navigation as any).navigate("indicative")
    }

    const route = useNavigation();

  const handleAandB = () => {
    // code to handle the browser action
    (navigation as any).navigate("a&b");
  };

  const router = useNavigation();

  const handleAllPersons = () => {
    // code to handle the browser action
    (navigation as any).navigate("allpersons");
  };

  return (
    <View style={styles.container}>
    
      <Text style={styles.header}>Form Sections</Text>

      <TouchableOpacity
           
           onPress={() => handleIndicative()}
           >
            <Text style ={styles.button}>INDICATIVE INFORMATION</Text>
           </TouchableOpacity>
      
        <TouchableOpacity
           
           onPress={() => handleAandB()}
           >
            <Text style ={styles.button}>Part A & B</Text>
           </TouchableOpacity>

           <TouchableOpacity
           
           onPress={() => handleAllPersons()}
           >
            <Text style ={styles.button}>FOR ALL PERSONS</Text>
           </TouchableOpacity>



    </View>
  )
}

export default Menu

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#b4b4bf', // Dark background
        justifyContent: 'center',
       
      },
    button: {
    width: '90%',
    padding: 15,
    backgroundColor: '#E5E5E5', // Blue button
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
    textAlign: 'center',
    marginLeft: 20,
    },

    header:{
    fontSize: 24,
    fontWeight: "bold",
    color: "#333", // Darker text color for contrast
    textAlign: "center",
    marginBottom: 100,
    },
})