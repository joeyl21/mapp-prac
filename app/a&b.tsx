import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { Children, useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import CheckBox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';
import {
  addPerson,
  getPersons,
  updatePerson,
  deletePerson,
  initializeDB,
  Partab,
  } from "./abdatabase"; // Import initializeDB


const AandB = () => {
    const [famnum, setFamnum] = useState("");
    const [pnumber, setPnumber] = useState("");
    const [pname, setPname] = useState("");
    const [childrenYes, setChildrenYes] = useState(false);
    const [childrenNo, setChildrenNo] = useState(false);
    const [membersYes, setMembersYes] = useState(false);
    const [membersNo, setMembersNo] = useState(false);
    const [comments, setComments] = useState("");
    const [persons, setPersons] = useState<Partab[]>([]);
    const [selectedPerson, setSelectedPerson] = useState<number | null>(null);
    const [editingPersonId, setEditingPersonId] = useState<number | null>(null); 

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
        if (!famnum || !pnumber || !pname || (!childrenYes && !childrenNo) || (!membersYes && !membersNo) || !comments) {
          Alert.alert("Error", "Please fill in all fields correctly.");
          return;
        }
        
        try {
          if (editingPersonId) {
          // Update existing person
          await updatePerson(
          editingPersonId,
          famnum,
          pnumber,
          pname,
          childrenNo,
          membersNo,
          comments,
          );
          console.log("Person updated successfully");
          } else {
          // Add new person
          const id = await addPerson(
            famnum,
            pnumber,
            pname,
            childrenNo,
            membersNo,
            comments,
        
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
            const handleUpdateClick = (partab: Partab) => {
            // Populate the form with the selected person's data
            setFamnum(partab.famnum);
            setPnumber(partab.pnumber);
            setPname(partab.pname);
            setChildrenYes(partab.children);
            setChildrenNo(partab.children);
            setMembersYes(partab.members);
            setMembersNo(partab.members);
            setComments(partab.comments);
            
  
  
            // setDate(new Date(person.date)); // Assuming dateOfBirth is a string
            setEditingPersonId(partab.id); // Set the ID for updating
            };
  
            const resetForm = () => {
            // Clear the form after submission or update
            setFamnum("");
            setPnumber("");
            setPname("");
            setChildrenYes(false);
            setChildrenNo(false);
            setMembersYes(false);
            setMembersNo(false);
            setComments("");
            };








    const navigation = useNavigation();
    const handleAllPersons = () => {
        // code to handle the browser action
        (navigation as any).navigate("allpersons");
      };

      const handleIndicative = () => {
        // code to handle the browser action
        (navigation as any).navigate("indicative");
      };

    
  return (
    <View style={styles.container}>
      <ScrollView>
    
      <Text style={styles.header}>Part A & B </Text>
      <View style={styles.card}>
      <Text> A. Number of people in the household on the night of Sunday 16th June 2024.</Text>
      <Picker
        selectedValue={famnum}
        onValueChange={(itemValue) => setFamnum(itemValue)}
        style={styles.picker}
        >
        <Picker.Item label={"Select No."} />
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        </Picker>

        {/* <Text> B. Number of all persons </Text> */}
        
        <TextInput style={styles.input}
                placeholder="Enter number"
                value={pnumber}
                onChangeText={setPnumber}
                placeholderTextColor="#888"/>

        <TextInput style={styles.input}
                placeholder="Name"
                value={pname}
                onChangeText={setPname}
                placeholderTextColor="#888"/>

        
        <View style={styles.checkboxContainer}>
        <Text> 1.A Childern not recorded?</Text>
          <CheckBox
            value={childrenYes}
            onValueChange={setChildrenYes}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Yes</Text>
          <CheckBox
            value={childrenNo}
            onValueChange={setChildrenNo}
            style={styles.checkbox}
          />
          <Text style={styles.label}>No</Text>
        </View>

       
        <View style={styles.checkboxContainer}>
        <Text>1.B. Memebers not listed?</Text>
          <CheckBox
            value={membersYes}
            onValueChange={setMembersYes}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Yes</Text>
          <CheckBox
            value={membersNo}
            onValueChange={setMembersNo}
          />
          <Text style={styles.label}>No</Text>
        </View>

        {/* <Text>Comments/Remarks:</Text> */}
        <TextInput
        style={styles.input}
        placeholder="Enter Comments"
        value={comments}
        onChangeText={setComments}
        placeholderTextColor="#888"
        
        />  
    </View>

    {/* <Button 
      title={selectedPerson ? "Update" : "Submit"}
      onPress={handleSubmit} 
      /> */}


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
           
           onPress={() => handleAllPersons()}
           >
            <Text style={styles.nxtbutton}>Next</Text>
           </TouchableOpacity>

           <TouchableOpacity
           
           onPress={() => handleIndicative()}
           >
            <Text style={styles.prevbutton}>Back</Text>
           </TouchableOpacity>     

           </View>         

{/* Table to display records */}
<ScrollView horizontal>
<View style={styles.tableContainer}>
<View style={styles.tableHeader}>
<Text style={styles.tableHeaderText}>Fam Num</Text>
<Text style={styles.tableHeaderText}>P. Num</Text>
<Text style={styles.tableHeaderText}>P. Name</Text>
<Text style={styles.tableHeaderText}>Child</Text>
<Text style={styles.tableHeaderText}>Member</Text>
<Text style={styles.tableHeaderText}>Comments</Text>
</View>
{persons.map((partab) => (
<View key={partab.id} style={styles.tableRow}>
<Text style={styles.tableRowText}>{partab.famnum}</Text>
<Text style={styles.tableRowText}>{partab.pnumber}</Text>
<Text style={styles.tableRowText}>{partab.pname}</Text>
<Text style={styles.tableRowText}>{partab.children ? "Yes" : "No"}</Text>
<Text style={styles.tableRowText}>{partab.members ? "Yes" : "No"}</Text>
<Text style={styles.tableRowText}>{partab.comments || "No comments"}</Text>

{/* <Text style={styles.tableRowText}>
{new Date(person.date).toDateString()}
</Text> */}
<View style={styles.actionButtons}>

<TouchableOpacity
style={styles.updateButton}
onPress={() => handleUpdateClick(partab)}
>
<Text style={styles.buttonText}>Update</Text>
</TouchableOpacity>

<TouchableOpacity
style={styles.deleteButton}
onPress={() => handleDelete(partab.id)}
>
<Text style={styles.buttonText}>Delete</Text>
</TouchableOpacity>
</View>
</View>
))}
</View>

</ScrollView>

</ScrollView>
    </View>
  )
}

export default AandB

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#b4b4bf', // Dark background
       
       
      },
      card: {
        width: '90%',
        backgroundColor: '#EFEFEF', // White card
        borderRadius: 10,
        padding: 20,
        marginLeft: 20,
        
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
        marginLeft: 30,
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
       marginLeft: 0,
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
      marginRight: 30,
      },


      picker: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 13,
        backgroundColor: "#FFF",
        marginBottom: 20,
      },
      header: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333", // Darker text color for contrast
        textAlign: "center",
        marginBottom: 30,
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
    checkboxContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
            fontSize: 5
     },
    checkbox: {
         marginRight: 10,
    },
    label: {
        fontSize: 16,
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




})