
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";


const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  const navigation = useNavigation();

    const handleMainmenu = () => {
      //code to handle the browse action
      (navigation as any).navigate("mainmenu")
    }

  return (
    <View style={ styles.container}>
        <View style={styles.card}>
      <Text style={styles.title}>WELCOME BACK!</Text>
      <Text style={styles.subtitle}> SIGN IN</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
       {/* <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
           
           onPress={() => handleMainmenu()}
           >
            <Text style ={styles.button}>LOGIN</Text>
           </TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
     </View> 
    </View>
  )
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b4b4bf', // Dark background
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#8282686', // White card
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  subtitle: {
    fontSize: 35,
    marginBottom: 70,
    color: '#1657ED'
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff'
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#007BFF', // Blue button
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#007BFF',
    marginTop: 10,
  },
  
})
