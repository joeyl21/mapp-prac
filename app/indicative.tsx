import React, { useEffect, useState } from "react";
import {
View,
TextInput,
Text,
Button,
StyleSheet, 
Platform,
ScrollView,
TouchableOpacity,
Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import {
  addPerson,
  getPersons,
  updatePerson,
  deletePerson,
  initializeDB,
  Person,
  } from "./database"; // Import initializeDB



const Indicative = () => {
// States for inputs
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [phone, setPhone] = useState("");
  // const [email, setEmail] = useState("");
  // const [gender, setGender] = useState("Select Gender"); // Default dropdown rvalue
  const [province, setProvince] = useState("Select Province");
  const [District, setDistrict] = useState("");
  const [LLG, setLLG] = useState("");
  const [wards, setWards] = useState("");
  const [censusunit, setCensusUnit] = useState("");
  const [censusunittype, setCensusUnitType] = useState("");
  const [workload, setWorkLoad] = useState("");
  const [locality, setLocality] = useState("");
  const [section, setSection] = useState("");
  const [lot, setLot] = useState("");
  const [structure, setStructure] = useState("");
  const [pd, setPD] = useState("");
  const [household, setHousehold] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false); // Handle visibility of Date Picker
  const [persons, setPersons] = useState<Person[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<number | null>(null);
  const [editingPersonId, setEditingPersonId] = useState<number | null>(null); 
  
  const onChangeDate = (
    event: { nativeEvent: { timestamp: number } },
    selectedDate?: Date
  ) => {
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
    setupDatabase();}, []);

    const handleSubmit = async () => {
      if (
      // !firstName ||
      // !lastName ||
      // !phone ||
      // !email ||
      // gender === "Select Gender"
   
      !District ||
      !LLG ||
      !wards ||
      !censusunit ||
      !censusunittype ||
      !workload ||
      !locality ||
      !section ||
      !structure ||
      !lot ||
      !household ||
      !pd ||
      province === "Select Province"
      ) {
      Alert.alert("Error", "Please fill in all fields correctly.");
      return;
      }
      try {
        if (editingPersonId) {
        // Update existing person
        await updatePerson(
        editingPersonId,
        province,
        District,
        LLG,
        wards,
        // date.toISOString(),
        censusunit,
        censusunittype,
        workload,
        locality,
        section,
        structure,
        lot,
        household,
        pd,


        );
        console.log("Person updated successfully");
        } else {
        // Add new person
        const id = await addPerson(
          province,
          District,
          LLG,
          wards,
          // date.toISOString(),
          censusunit,
          censusunittype,
          workload,
          locality,
          section,
          structure,
          lot,
          household,
          pd,
  
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
          const handleUpdateClick = (person: Person) => {
          // Populate the form with the selected person's data
          setProvince(person.province);
          setDistrict(person.District);
          setLLG(person.LLG);
          setWards(person.wards);
          setCensusUnit(person.censusunit);
          setCensusUnitType(person.censusunittype);
          setWorkLoad(person.workload);
          setLocality(person.locality);
          setSection(person.section);
          setStructure(person.structure);
          setLot(person.lot);
          setHousehold(person.household);
          setPD(person.pd)
          


          // setDate(new Date(person.date)); // Assuming dateOfBirth is a string
          setEditingPersonId(person.id); // Set the ID for updating
          };

          const resetForm = () => {
          // Clear the form after submission or update
          setProvince("");
          setDistrict("");
          setLLG("");
          setWards("");
          setCensusUnit("");
          // setDate(new Date());
          setCensusUnitType("");
          setWorkLoad("");
          setLocality("");
          setSection("");
          setStructure("");
          setLot("");
          setHousehold("");
          setPD("");
          setEditingPersonId(null); // Reset ID for creating new entries
          
          };
          



// Function to handle form submission
 

const navigation = useNavigation();

  const handleAandB = () => {
    // code to handle the browser action
    (navigation as any).navigate("a&b");
  };

  const handlemenu = () => {
    // code to handle the browser action
    (navigation as any).navigate("mainmenu");
  };

 

return (
<ScrollView contentContainerStyle={styles.container}>
<View style={styles.container}>
<Text style={styles.header}>INDICATIVE INFORMATION</Text>
<View style={styles.card}>
{/* Text Input 1 */}


<Picker
selectedValue={province}
onValueChange={(itemValue) => setProvince(itemValue)}
style={styles.picker}
>
<Picker.Item label={"Select Province"} />
<Picker.Item label="Morobe" value="morobe" />
<Picker.Item label="East Sepik" value="east sepik" />
<Picker.Item label="Madang" value="madang" />
</Picker>



{/* Text Input 2 */}

<TextInput
style={styles.input}
placeholder="Enter District"
value={District}
onChangeText={setDistrict}
placeholderTextColor="#888"/>

<TextInput
style={styles.input}
placeholder="Enter LLG"
value={LLG}
onChangeText={setLLG}
placeholderTextColor="#888"/>

<TextInput
style={styles.input}
placeholder="Enter Ward"
value={wards}
onChangeText={setWards}
placeholderTextColor="#888"/>

<TextInput
style={styles.input}
placeholder="Enter Census Unit"
value={censusunit}
onChangeText={setCensusUnit}
placeholderTextColor="#888"/>

<TextInput
style={styles.input}
placeholder="Enter Census Unit Type"
value={censusunittype}
onChangeText={setCensusUnitType}
placeholderTextColor="#888"/>

<TextInput
style={styles.input}
placeholder="Enter Work Load"
value={workload}
onChangeText={setWorkLoad}
placeholderTextColor="#888"/>

<TextInput
style={styles.input}
placeholder="Locality"
value={locality}
onChangeText={setLocality}
placeholderTextColor="#888"/>

<TextInput
style={styles.secinput}
placeholder="section"
value={section}
onChangeText={setSection}
placeholderTextColor="#888"/>

<TextInput
style={styles.ninput}
placeholder="Lot #"
value={lot}
onChangeText={setLot}
placeholderTextColor="#888"/>

<TextInput
style={styles.structureinput}
placeholder="Record #"
value={structure}
onChangeText={setStructure}
placeholderTextColor="#888"/>

<TextInput
style={styles.pdinput}
placeholder="PD #"
value={pd}
onChangeText={setPD}
placeholderTextColor="#888"/>

<TextInput
style={styles.hinput}
placeholder="Hhold #"
value={household}
onChangeText={setHousehold}
placeholderTextColor="#888"/>
</View>
{/* <View>
 <Button
title="Select Date of Birth"
onPress={() => setShowDatePicker(true)}
/>
{showDatePicker && (
<DateTimePicker
value={date}
mode="date"
display="default"
onChange={onChangeDate}
/>
)}
<Text style={styles.dateText}>
Date of Birth: {date.toDateString()}
</Text>
</View> */}





<View style={styles.buttonContainer}>



<TouchableOpacity 
  style={styles.subbutton} 
  onPress={handleSubmit}
>
  <Text style={styles.buttonText}>
    {selectedPerson ? "Update" : "Submit"}
  </Text>
</TouchableOpacity>


<TouchableOpacity
           
   onPress={() => handleAandB()}
 >
<Text style={styles.nxtbutton}>Next</Text>
</TouchableOpacity>

<TouchableOpacity
           
   onPress={() => handlemenu()}
 >
<Text style={styles.prevbutton}>Back</Text>
</TouchableOpacity>

</View>

{/* Table to display records */}
<ScrollView horizontal>
<View style={styles.tableContainer}>
<View style={styles.tableHeader}>
<Text style={styles.tableHeaderText}>Province</Text>
<Text style={styles.tableHeaderText}>District</Text>
<Text style={styles.tableHeaderText}>LLG</Text>
<Text style={styles.tableHeaderText}>Ward</Text>
<Text style={styles.tableHeaderText}>Census Unit</Text>
<Text style={styles.tableHeaderText}>Census Unit Type</Text>
<Text style={styles.tableHeaderText}>Work Load</Text>
<Text style={styles.tableHeaderText}>Locality</Text>
<Text style={styles.tableHeaderText}>Section</Text>
<Text style={styles.tableHeaderText}>Record#</Text>
<Text style={styles.tableHeaderText}>Lot#</Text>
<Text style={styles.tableHeaderText}>Hhold#</Text>
<Text style={styles.tableHeaderText}>PD#</Text>
</View>
{persons.map((person) => (
<View key={person.id} style={styles.tableRow}>
<Text style={styles.tableRowText}>{person.province}</Text>
<Text style={styles.tableRowText}>{person.District}</Text>
<Text style={styles.tableRowText}>{person.LLG}</Text>
<Text style={styles.tableRowText}>{person.wards}</Text>
<Text style={styles.tableRowText}>{person.censusunit}</Text>
<Text style={styles.tableRowText}>{person.censusunittype}</Text>
<Text style={styles.tableRowText}>{person.workload}</Text>
<Text style={styles.tableRowText}>{person.locality}</Text>
<Text style={styles.tableRowText}>{person.section}</Text>
<Text style={styles.tableRowText}>{person.structure}</Text>
<Text style={styles.tableRowText}>{person.lot}</Text>
<Text style={styles.tableRowText}>{person.household}</Text>
<Text style={styles.tableRowText}>{person.pd}</Text>
{/* <Text style={styles.tableRowText}>
{new Date(person.date).toDateString()}
</Text> */}
<View style={styles.actionButtons}>

<TouchableOpacity
style={styles.updateButton}
onPress={() => handleUpdateClick(person)}
>
<Text style={styles.buttonText}>Update</Text>
</TouchableOpacity>

<TouchableOpacity
style={styles.deleteButton}
onPress={() => handleDelete(person.id)}
>
<Text style={styles.buttonText}>Delete</Text>
</TouchableOpacity>
</View>
</View>
))}
</View>

</ScrollView>

</View>
</ScrollView>
);
};
// Styling for a modern look
const styles = StyleSheet.create({
container: {
flexGrow: 1,
padding: 20,
backgroundColor: "#b4b4bf", // Slightly off-white for a modern clean 

justifyContent: "center",
},
header: {
fontSize: 24,
fontWeight: "bold",
color: "#333", // Darker text color for contrast
textAlign: "center",
marginBottom: 30,
},

card: {
  width: '110%',
  backgroundColor: '#EFEFEF', // White card
  borderRadius: 10,
  padding: 20,
  marginLeft: -12,
  height: 785,
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
  marginLeft: -3,
  color: '#FFFFFF',
 
},
nxtbutton: {
  width: 100,
  padding: 8,
  backgroundColor: '#007BFF', // Blue button
  borderRadius: 5,
  alignItems: 'center',
  marginVertical: 10,
  textAlign: 'center',
  fontSize: 14,
  color:'#fff',
 marginLeft: 8,
},

prevbutton: {
  width: 100,
  padding: 8,
  backgroundColor: '#007BFF', // Blue button
  borderRadius: 5,
  alignItems: 'center',
  marginVertical: 10,
  textAlign: 'center',
  fontSize: 14,
  color:'#fff',
 marginLeft: 8,
},




button: {
  width: 100,
  padding: 8,
  backgroundColor: '#007BFF', // Blue button
  borderRadius: 3,
  alignItems: 'center',
  marginVertical: 10,
  textAlign: 'center',
  color: '#fff',
},

input: {
height: 50,
borderColor: "#ccc",
borderWidth: 1,
borderRadius: 12, // Rounded corners for a modern feel
paddingHorizontal: 15,
marginBottom: 20,
backgroundColor: "#fff", // White background for input fields
shadowColor: "#000", // Shadow for subtle elevation
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.1,
shadowRadius: 4,
elevation: 3, // Elevation on Android
},
picker: {
height: 50,
borderColor: "#ccc",
borderWidth: 1,
borderRadius: 12,
backgroundColor: "#fff",
marginBottom: 20,

},
dateText: {
  marginTop: 10,
  marginBottom: 20,
  borderRadius: 12,
  fontSize: 16,
  color: "#666", // Subtle gray for date display
  },
  buttonProps: {
  backgroundColor: "#0a7ea4",
  
  },

  ninput: {
    height: 50,
    width: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12, // Rounded corners for a modern feel
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#fff", // White background for input fields
   shadowColor: "#000", // Shadow for subtle elevation
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.1,
   shadowRadius: 4,
   elevation: 3, // Elevation on Android
   marginLeft: 155,
  },

structureinput: {
  height: 50,
    width: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12, // Rounded corners for a modern feel
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#fff", // White background for input fields
   shadowColor: "#000", // Shadow for subtle elevation
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.1,
   shadowRadius: 4,
   elevation: 3, // Elevation on Android
   marginTop: -70,
},
  pdinput: {
    height: 50,
    width: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12, // Rounded corners for a modern feel
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#fff", // White background for input fields
   shadowColor: "#000", // Shadow for subtle elevation
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.1,
   shadowRadius: 4,
   elevation: 3, // Elevation on Android
   marginLeft: 155,
  },
    secinput: {
      height: 50,
      width: 300,
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 12, // Rounded corners for a modern feel
      paddingHorizontal: 15,
      marginBottom: 20,
      backgroundColor: "#fff", // White background for input fields
     shadowColor: "#000", // Shadow for subtle elevation
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.1,
     shadowRadius: 4,
     elevation: 3, // Elevation on Android
    },
    hinput: {
      height: 50,
      width: 150,
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 12, // Rounded corners for a modern feel
      paddingHorizontal: 15,
      marginBottom: 20,
      backgroundColor: "#fff", // White background for input fields
     shadowColor: "#000", // Shadow for subtle elevation
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.1,
     shadowRadius: 4,
     elevation: 3, // Elevation on Android
     marginTop: -70,
    },

    submitbtn:{
      width: '100%',
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
      buttonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
  


  });
  export default Indicative;
  
