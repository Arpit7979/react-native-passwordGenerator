import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import * as yup from "yup";
import { Formik } from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const passwordSchema = yup.object({
    passwordLength:yup.number().required().min(5).max(20)
})



export default function AppClone() {
    const [password,setPassword]=useState("")
    const [passwordVisible,setPasswordVisible]=useState(false)
    const [upperCase,setUpperCase]=useState(true)
    const [lowerCase,setLowerCase]=useState(false)
    const [degit,setdigit]=useState(false)
    const [symbol,setSymbol]=useState(false)

    const passwordString = (passwordLength:number)=>{
        let selectedString = "";
       
          const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
           const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
           const digitChars = '0123456789';
           const specialChars = '!@#$%^&*()_+';
       
           if(upperCase){
            selectedString+=upperCaseChars;
           }
           if(lowerCase){
            selectedString+=lowerCaseChars;
           }
           if(degit){
            selectedString+=digitChars;
           }
           if(symbol){
            selectedString+=specialChars;
           }

         const passwordResult=  actualPassword(selectedString,passwordLength);
         console.log(passwordResult);
         setPassword(passwordResult);
         setPasswordVisible(true);
        
       }
       
       const actualPassword = (characters:string,passwordLength:number)=>{
       let result = "";
       for (let i = 0; i < passwordLength; i++) {
        const charIndex = Math.round(Math.random()*characters.length)
        result += characters.charAt(charIndex);
       }
       return result;
       }
       
       const resetPasswordState = ()=>{
       setPassword("")
       setPasswordVisible(false)
       setUpperCase(true)
       setLowerCase(false)
       setdigit(false)
       setSymbol(false)
       }


  return (
    <ScrollView keyboardShouldPersistTaps="handled">
        <SafeAreaView>
        <View>
          <Text style={styles.heading}>Password Generator</Text>
        </View>
        <Formik 
        initialValues={{passwordLength:""}}
        validationSchema={passwordSchema}
        onSubmit={(values)=>passwordString(+values.passwordLength)}
        >
            {({values,handleBlur,handleChange,handleReset,errors,touched,handleSubmit})=>(
                <View>
                    <View style={styles.lengthContainer}>
                    <Text>Password Length</Text>
                    <TextInput
                    style={styles.lengthBox}
                    placeholder='EX-8'
                    onChangeText={handleChange("passwordLength")}
                    value={values.passwordLength}
                    />
                    </View>
                    <Text style={styles.errorMessage}>{errors.passwordLength}</Text>
                    <View style={styles.checkbox}>
                    <BouncyCheckbox
                    text='Include Upper-Case'
                    disableBuiltInState
                    isChecked={upperCase}
                    onPress={()=>{setUpperCase(!upperCase)}}
                    />
                    <BouncyCheckbox
                    text='Include lower-Case'
                    disableBuiltInState
                    isChecked={lowerCase}
                    onPress={()=>{setLowerCase(!lowerCase)}}
                    />
                    <BouncyCheckbox
                    text='Include symbols'
                    disableBuiltInState
                    isChecked={symbol}
                    onPress={()=>{setSymbol(!symbol)}}
                    />
                    <BouncyCheckbox
                    text='Include digits'
                    disableBuiltInState
                    isChecked={degit}
                    onPress={()=>{setdigit(!degit)}}
                    />
                    </View>
                    <View style={styles.btncontainer}>
                        <TouchableOpacity onPress={()=>handleSubmit()}>
                            <Text style={styles.btnPrimary}>Generate</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>(handleReset(),resetPasswordState())}>
                            <Text style={styles.btnPrimary}>Reset</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            )}

        </Formik>
        {passwordVisible?<View style={styles.passwordContainer}>
            <Text style={styles.passwordtext}>{password}</Text>
        </View>:null}
        </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({

    heading:{
    margin:10,
    fontSize:20,
    color:"#E5C287"

    },

    lengthBox:{
    borderWidth:1,
    margin:10,
    width:100,
    borderColor:"#E8751A"
    },

    checkbox:{
    margin:10,
    gap:10,
    },

    lengthContainer:{
        flex:1,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        margin:10,
    },
    btncontainer:{
        flex:1,
        flexDirection:"row",
        margin:10,
        justifyContent:"space-evenly",
        alignItems:"center",
        marginTop:50,
    },
    btnPrimary:{
    borderWidth:1,
    fontSize:15,
    padding:10,
    color:"#FDA403",
    borderColor:"#E8751A"
    },
    passwordContainer:{
        margin:10,
        padding:10,
        backgroundColor:"#B0C5A4",
        borderRadius:7,
        height:100,
        justifyContent:"center",
        alignItems:"center"
        
        
    },
    passwordtext:{
        fontSize:20,
        color:"#222831"
    },
    errorMessage:{
        fontSize:12,
        color:"red",
        margin:10,
        

    }
})