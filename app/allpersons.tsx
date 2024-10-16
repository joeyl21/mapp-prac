import { Alert, Button, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import CheckBox from 'expo-checkbox';
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from '@react-navigation/native';
import { 
  addPerson, 
  deletePerson,
  getPersons,
  initializeDB,
  partall, 
  updatePerson } from './alldatabase';


const AllPersons = () => {
    const [personno, setPersonno] = useState("");
    const [personname, setPersonname] = useState("");
    const [relo, setRelo] = useState("");
    const [gender,SetGender] = useState ("Select Gender");
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false); // Handle visibility of Date Picker
    const [age, setAge] = useState("");
    const [marital, setMarital] = useState("");
    const [citizen, SetCitizen] = useState ("Select Citizenship");
    const [specify, setSpecify] = useState("");
    const [persons, setPersons] = useState<partall[]>([]);
    const [selectedPerson, setSelectedPerson] = useState<number | null>(null);
    const [editingPersonId, setEditingPersonId] = useState<number | null>(null);

    const onChangeDate = (event: any, selectedDate?: Date) => {
      const currentDate = selectedDate || date;
      setShowDatePicker(Platform.OS === "ios");
      setDate(currentDate);
      };
      
    
    const fetchPersons = async () => {
      const allPersons = await getPersons();
      setPersons(allPersons);
    };
  
    useEffect(() => {
      const setupDatabase = async () => {
      await initializeDB();
      fetchPersons();
      };
      setupDatabase();
      }, []);
      
      const handleSubmit = async () => {
        if (
        !personno ||
        !personname ||
        !relo ||
        // !date ||
        !age ||
        !marital ||
        !citizen ||
        !specify ||
        gender === "Select Gender" 
        
        ) {
        Alert.alert("Error", "Please fill in all fields correctly.");
        return;
        }
        try {
         if (editingPersonId) {
        // Update existing person
           await updatePerson(
        editingPersonId,
        personno,
        personname,
        relo,
        date.toISOString(),
        gender,
        age,
        marital,
        citizen,
        specify 
        );
        console.log("Person updated successfully");
        } else {
        // Add new person
        const id = await addPerson(
          personno,
          personname,
          relo,
          date.toISOString(),
          gender,
          age,
          marital,
          citizen,
          specify 
        );
        console.log("Person created successfully with ID:", id);
        }
        resetForm();
        fetchPersons(); // Refresh the list
      } catch (error) {
        console.error("Error submitting person:", error);
      }
    };

    const handleDelete = async (id: number) => {
      try {
        await deletePerson(id);
        console.log("Person deleted successfully");
        fetchPersons(); // Refresh the list after deleting
      } catch (error) {
        console.error("Error deleting person:", error);
      }
    };

    const handleUpdateClick = (partall: partall) => {
// Populate the form with the selected person's data
      setPersonno(partall.personno);
      setPersonname(partall.personname);
      setRelo(partall.relo);
      SetGender(partall.gender);
      setAge(partall.age);
      setMarital(partall.marital);
      SetCitizen(partall.citizen);
      setSpecify(partall.specify);
      setDate(new Date(partall.date)); // Assuming dateOfBirth is a string
      setEditingPersonId(partall.id); // Set the ID for updating
    };

const resetForm = () => {
// Clear the form after submission or update
    setPersonno("");
    setPersonname("");
    setRelo("");
    setAge("");
    SetGender("Select Gender");
    setDate(new Date());
    setMarital("");
    SetCitizen("");
    setSpecify("");
    setEditingPersonId(null); // Reset ID for creating new entries
    };

            
    const navigation = useNavigation();
    const handleIndicative = () => {
        // code to handle the browser action
        (navigation as any).navigate("indicative");
      };

      const handlemenu = () => {
        // code to handle the browser action
        (navigation as any).navigate("mainmenu");
      };






  return (
    <ScrollView>
    <View>
      <View style={styles.container}>
      <Text style={styles.header}>For All Persons</Text>
      <View style={styles.card}>
        <Text>Person No:</Text>
        <TextInput style={styles.input}
        placeholder="1"
        value={personno}
        onChangeText={setPersonno}
        placeholderTextColor="#888"/>

     <Text>1. Name:</Text>
     <TextInput style={styles.input}
        placeholder="Anna Jeff"
        value={personname}
        onChangeText={setPersonname}
        placeholderTextColor="#888"/>

    <Text>2. Relationship:</Text>
    <Picker
        selectedValue={relo}
        onValueChange={(itemValue) => setRelo(itemValue)}
        style={styles.picker}
        >
        <Picker.Item label={"select Relation"} />
        <Picker.Item label="Mother" value="mother" />
        <Picker.Item label="Father" value="father" />
        <Picker.Item label="Brother" value="brother" />
        <Picker.Item label="Sister" value="sister" />
        </Picker>


    <Text>3. Sex:</Text>
   
    <Picker
selectedValue={gender}
onValueChange={(itemValue) => SetGender(itemValue)}
style={styles.picker}
>
<Picker.Item label={"Select Gender"} />
<Picker.Item label="Male" value="male" />
<Picker.Item label="Female" value="female" />

</Picker>

        

        <Text>4. DOB:</Text>
        <View>
        <Button
            title="Select Date of Birth"
            onPress={() => setShowDatePicker(true)}
        ></Button>
        {showDatePicker && (
        <DateTimePicker
        value={date}
        mode="date"
        display="default"
        onChange={onChangeDate}
        />
        )}
        <Text style={styles.datetext}> Date of Birth: {date.toDateString()}
        </Text>
        </View>

        <Text> Age:</Text>
        <TextInput style={styles.input}
        placeholder="24"
        value={age}
        onChangeText={setAge}
        placeholderTextColor="#888"/>

        <Text> 5. Marital Status:</Text>
        <Picker
        selectedValue={marital}
        onValueChange={(itemValue) => setMarital(itemValue)}
        style={styles.picker}
        >
        <Picker.Item label={"Married"} />
        <Picker.Item label="Married" value="Married" />
        <Picker.Item label="Single" value="Single" />
        <Picker.Item label="Divorced" value="Divorced" />
        <Picker.Item label="Widowed" value="Widowed" />
        </Picker>

        <Text>6. Citizenship:</Text>
        
        <Picker
selectedValue={citizen}
onValueChange={(itemValue) => SetCitizen(itemValue)}
style={styles.picker}
>
<Picker.Item label={"Select Citizenship"} />
<Picker.Item label="PNGean" value="png" />
<Picker.Item label="Non-PNG" value="non-png" />

</Picker>

        
        <TextInput 
        style={styles.input}
        placeholder="Specify"
        value={specify}
        onChangeText={setSpecify}
        placeholderTextColor="#888"
        />
        </View>

     


<View style={styles.buttonContainer}>
<TouchableOpacity 
  style={styles.subbutton} 
  onPress={handleSubmit}
>
  <Text style={styles.buttonText}>
    {selectedPerson ? "Update" : "Submit"}
  </Text>
</TouchableOpacity>



        <TouchableOpacity onPress={() => handleIndicative()} >
          <Text style={styles.recbutton}>New Record</Text>
           </TouchableOpacity>

           <TouchableOpacity onPress={() => handlemenu()} >
            <Text style={styles.menubutton}>Back to Menu</Text>
           </TouchableOpacity>

           </View>
          
<ScrollView horizontal>
<View style={styles.tableContainer}>
<View style={styles.tableHeader}>
<Text style={styles.tableHeaderText}>No.</Text>
<Text style={styles.tableHeaderText}>Name</Text>
<Text style={styles.tableHeaderText}>Relo</Text>
<Text style={styles.tableHeaderText}>Gender</Text>
<Text style={styles.tableHeaderText}>DOB</Text>
<Text style={styles.tableHeaderText}>Age</Text>
<Text style={styles.tableHeaderText}>Stat</Text>
<Text style={styles.tableHeaderText}>Citizenship</Text>
<Text style={styles.tableHeaderText}>Specify</Text>
</View>
{persons.map((partall) => (
<View key={partall.id} style={styles.tableRow}>
<Text style={styles.tableRowText}>{partall.personno}</Text>
<Text style={styles.tableRowText}>{partall.personname}</Text>
<Text style={styles.tableRowText}>{partall.relo}</Text>
<Text style={styles.tableRowText}>{partall.gender}</Text>
<Text style={styles.tableRowText}>{partall.age}</Text>
<Text style={styles.tableRowText}>{partall.marital}</Text>
<Text style={styles.tableRowText}>{partall.citizen}</Text>
<Text style={styles.tableRowText}>{partall.specify}</Text>
<Text style={styles.tableRowText}>
{new Date(partall.date).toDateString()}
</Text>
<View style={styles.actionButtons}>

<TouchableOpacity
style={styles.updateButton}
onPress={() => handleUpdateClick(partall)}
>
<Text style={styles.buttonText}>Update</Text>
</TouchableOpacity>

<TouchableOpacity
style={styles.deleteButton}
onPress={() => handleDelete(partall.id)}
>
<Text style={styles.buttonText}>Delete</Text>
</TouchableOpacity>
</View>
</View>
))}
</View>

</ScrollView>


      </View>
    </View>
    
    </ScrollView>
  )
}

export default AllPersons

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#b4b4bf', // Dark background
    },

    buttonContainer: {
      flexDirection: 'row', // Align items horizontally
      justifyContent: 'space-between', // Space items evenly
      alignItems: 'center', // Center vertically
      marginVertical: 10, // Add vertical margin if needed
    },

    subbutton: {
      backgroundColor: '#007BFF', // Button color
      padding: 8,
      borderRadius: 5,
      alignItems: 'center',
      marginVertical: 10,
      width:100,
      marginLeft: 25,
      color: '#FFFFFF',
    },

    buttonText: {
      color: '#FFFFFF', // Text color
      fontSize: 14,
      fontWeight: 'bold',
    },

    recbutton: {
      backgroundColor: '#007BFF', // Button color
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginVertical: 10,
      color: '#FFFFFF',
      
    },
    menubutton: {
      backgroundColor: '#007BFF', // Button color
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginVertical: 10,
      marginRight:18,
      color: '#FFFFFF',
    },


    card: {
        width: '90%',
        backgroundColor: '#EFEFEF', // White card
        borderRadius: 10,
        padding: 20,
        marginLeft: 17,
    },

    input: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 12, // Rounded corners for a modern feel
        paddingHorizontal: 15,
        marginBottom: 20,
        backgroundColor: "#FFF", // White background for input fields
        shadowColor: "#000", // Shadow for subtle elevation
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Elevation on Android
    },

    picker: {
        height: 50,
        borderWidth: 1,
        borderRadius: 12,
        backgroundColor: "#FFF",
    },

    header: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333", // Darker text color for contrast
        textAlign: "center",
        marginBottom: 30,
    },
    
    
    label: {
        fontSize: 16,
    },
    datetext: {
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 12,
        fontSize: 16,
        color: "#666", // Subtle gray for date display
    },

    button: {
        width: '50%',
        padding: 15,
        backgroundColor: '#007BFF', // Blue button
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
        textAlign: 'center',
        color:"#fffff",
    },

    tableContainer: {
      margin: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      overflow: 'hidden',
    },

    tableHeader: {
      flexDirection: 'row',
      backgroundColor: '#f8f8f8',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },

    tableHeaderText: {
      flex: 1,
      padding: 10,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#333',
    },

    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },

    tableRowText: {
      flex: 1,
      padding: 10,
      textAlign: 'center',
      color: '#333',
    },

    actionButtons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },

    updateButton: {
      backgroundColor: '#4CAF50',
      padding: 10,
      margin: 5,
      borderRadius: 5,
    },

    deleteButton: {
      backgroundColor: '#f44336',
      padding: 10,
      margin: 5,
      borderRadius: 5,
    },
   


})




