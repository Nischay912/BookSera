import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import styles from '../../assets/styles/create.styles'
import COLORS from '../../constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { useAuthStore } from '../../store/authStore'
import { API_URL } from '../../constants/api'

// step435: now to use the ImagePicker we need the following import and install using "npx expo install expo-image-picker"
import * as ImagePicker from "expo-image-picker"

// we have this module/package to convert the image to base64 ; install using "npx expo install expo-file-system", thus here below.
import * as FileSystem from "expo-file-system"

export default function Create() {

  // step411: we first create the different states to be used here, thus here below.
  const [title, setTitle] = useState("")
  const [caption, setCaption] = useState("")
  const [rating, setRating] = useState(3) // default rating is 3
  const [image, setImage] = useState(null) // to display the image selected by us on the screen there

  // step412: now Base64 is a way to turn the images into text so that they can be easily sent over the internet ; its like translating the picture into words that computers can send in messages ; as we want to store this image as a string and then send this in the body when fetch request is sent, thus here below.
  const [imageBase64, setImageBase64] = useState(null)
  const [loading, setLoading] = useState(false) // initially false, as obviously we will be in loading state only when something is clicked like save or something, thus here below.

  //step413: now lets get the useRouter from expo-router to navigate between screens, thus here below.
  const router = useRouter();

  // step453: lets use the AuthStore to get the token from there, thus here below.
  const {token} = useAuthStore();

  // step430: now lets implement the funnction to load the image, thus here below.
  const pickImage = async () => {
    try {
      // step431: so we can have the below set of code to ask for media access permissions, thus here below.

      // step432: by logic, we ask for permission only if not on web , but in android or ios, thus here below.
      if(Platform.OS !== "web"){

        // step433: so we run the following function using the Expo Image Picker module , that has the ability to access the media files of the user, thus here below using the "requestMediaLibraryPermissionsAsync" method, thus here below ; and thus we extract the status property from the object it returns, thus here below.
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        // console.log({status})

        // step434: then if the status is not granted, then we show an alert , thus here below.
        if(status !== "granted"){
          Alert.alert("Error", "Permission to access media library is required");
          return; // return out of the function, then thus here below.
        }
      }

      // step435: then lets launch the image library to choose an image, thus here below.
      const result = await ImagePicker.launchImageLibraryAsync({

        // step436: choose what all will come to be chosen from there, thus here below.
        // mediaTypes: ["images", "videos"]
        mediaTypes: "images",
        allowsEditing: true, //to allow users to edit or crop the images, thus here below.
        aspect: [4,3], // to set the aspect ratio of the image to be 4:3, thus here below.

        // step437: we reduce the full quality from "1" to 0.5 , so that when the image is converted to text using base64, lower the quality of image, smaller the string representation for an image ; thus : Lower image quality is used to reduce image size and base64 payload for faster uploads and better performance without noticeable visual loss.
        quality: 0.5,

        // step438: then we set the belwo to be true, so that : to include the image data in base64 format as : it converts the selected image into a Base64 encoded string so it can be easily sent as text in API requests, thus here below.
        base64: true
      })
      // console.log("Result of selected image: ", result)

      // step439: then we get the result object as the following format , which we can console log and see too, thus here below-
      /*{
          canceled: false,
          assets: [
            {
              uri: "file:///storage/.../image.jpg",
              base64: "/9j/4AAQSkZJRgABAQAAAQABAAD...",
              width: 1080,
              height: 1350,
              type: "image"
            }
          ]
        } 
        
        so if the result is not cancelled due to : Happens when user opens the gallery but presses “Back / Cancel” without selecting an image, thus here below.
        */

        if(!result.canceled){
          setImage(result.assets[0].uri); // as clearly the uri is inside reuslt's assets array oth index ka { } mein"uri", thus [0].uri done, thus here below.

          // step440: so if base64 is there provided above for the selected image, we use it, thus here below.
          if(result.assets[0].base64){
            setImageBase64(result.assets[0].base64);
          }
          else{
            // step441: else if it was not set to base64 for any reason, we convert it to base64, thus here below.

            // step442: so we await till the filepath present in uri is encoded to base64 text, thus here below.
            const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {encoding: FileSystem.EncodingTypes.Base64});

            // step443: then update the state with this value, thus here below ; it thus helps to manually convert to base64 too, if it wasn't done above, to prevent any error, thus here below.
            setImageBase64(base64);
          }
        }
    } 
    catch (error) {
      console.log("Error while picking image: ", error)
      Alert.alert("Error", "Error while picking image")
    }
  }

  // step450: now lets make the function that will be used to submit the form, thus here below.
  const handleSubmit = async () => {
    // step451: so we can first put some validations to show some error messages, thus here below.
    if(!title || !caption || !imageBase64 || !rating){
      Alert.alert("Error", "All fields are required");
      return;      
    }
    try{
      // step452: first we make the loading state true whenever the submit button is clicked so that the time it takes to send data to the backend and get response , uss beech we see a loading spinner there, thus here below.
      setLoading(true);
      
      // step453: the exact format of a imageBasee64 is : data:image/png;base64,<base64 representation of the image> ; so the string part we got in imageBase64 state, but need to get the type of image first like "png" or "jpg" or "jpeg", etc ; thus here below first ; so if : image = "file:///storage/emulated/0/DCIM/Camera/bookCover.PNG" ; then : uriParts = ["file:///storage/emulated/0/DCIM/Camera/bookCover", "PNG" ] , so always last index n-1 is the type ; so we access it here below.
      const uriParts = image.split(".")
      const fileType = uriParts[uriParts.length - 1];

      // step454: so finally if the type is not got by the above method i.e. undefined , we set it to jpeg by default, else keep it lowercase what we got from above and proceed, thus here below.
      const imageType = fileType ? `image/${fileType.toLowerCase()}` : "image/jpeg";

      // step455: converting to the excat imageBase64 url type now, thus here below.

      // step456: now see the next steps in api.js file now there.
      const imageDataUrl = `data:${imageType};base64,${imageBase64}`;

      // step459: lets send a POST request to the backend with this image URL and get the response back, thus here below.
      const response = await fetch(`${API_URL}/books`, { // fetch is used to make HTTP requests
        method: "POST",
        
        // step460: "headers" i.e. extra information sent along with request that the server reads before reading the body, thus here below.
        headers:{
          // step 461: this authorization is a standard that we use to send a token to the server to authenticate the user, thus here below.
          Authorization: `Bearer ${token}`,

          // step462: sent to tell the body type to the server, so that server can parse it accordingly using JSON parser and all it uses in server.js file and thus get correct req.body() format there, thus here below.
          "Content-Type": "application/json"
        },

        // step463: the actual data sent to the server is now this body, thus here below.

        // step464: since server cannot read JS objects, so we convert it to JSON string, thus here below ; and the left hand side of all terms here below, should match the ones written in server.js routes exactly as it is there, thus here below.
        body: JSON.stringify({
          title,
          caption,
          rating: rating.toString(), // ensures that the rating is sent as string as backend expects string , the above stringify made this JS object as JSON , but each item should be string too, thus here below.

          // step465: the image URL is sent to the server as "image" key there in the body, thus here below.
          image: imageDataUrl,
        })
      })

      // step466: now lets get the data from the reponse, thus here below.

      //  MUST USE AWAIT , ELSE WILL NOT WORK AS ITS A SYNCHRONOUS FUNCTION TO PARSE, REQUIRES WAITING BY RULE, THUS HERE BELOW.
      const data = await response.json(); // Converts JSON text → JavaScript object, thus here below.

      // step467: we use response.ok to check if everything was ok or not, thus here below.
      if(!response.ok){
        throw new Error(data.message || "Something went wrong");
      }
      else{
        Alert.alert("Success", "Book published successfully");
      }

      // step468: finally reset all the statse so that the form again becomes cleared, thus here below ; as if value of lets say text input is not reset, the previous text will still be there, as value of textInput is the value of state its pointing at using value={caption} there like for example there like this, thus here below.
      setTitle("");
      setCaption("");
      setImage(null);
      setImageBase64(null);
      setRating(3); // back to the default value 3

      // step469: also navigate the user to the home screen, thus here below ; so "/" means the default index.jsx screen which was home here, thus here below.
      router.push("/");

    }
    catch(error){
      console.log("Error in publishing book", error);
      Alert.alert("Error", error.message || "Something went wrong");
    }

    // step470: now since the loading state bwing shown there should be set back to null, even if success is there or not success, so this has to run in eirther try or catch block, so thats why we prefer to put this in the "finally" block, thus here below.

    // step471: now we can check this by trying to submit a form and see the data stored in mongodb database there too ; and then we will be redirected to home page with form cleared due to to all states re-setted there, thus here below.

    // step472: see the next steps in index.jsx file now there.
    finally{
      setLoading(false);
    }

  }

  // step420: lets make the function that will be used to fill colors in the stars for rating section, thus here below.
  const renderRatingPicker = () => {
    // step421: array of stars to be filled in, when we click on it, thus here below.
    const stars = [];

    // step422: so we run a for loop 5 times and every time we add a button into the array using ".push", and when clicked on it, we updated the rating via setrating to that value of i, thus here below.

    // step423: then we also check using "if" that like the for loop runs for every i=1,2 ... 5 ; so when i=1, we check if the value of rating is lets say 1 , then thus i <= rating is true, so we render a filled star of color "golden", else we render a empty star of color as secondary color from styles, thus here below.
    for(let i=1 ; i<=5 ; i++){
      stars.push(
        // step424: key is needed in react for each items of lists, arrays, thus here below ; so here basically each star being rendered is a button , which when pressed updates the rating and then Ionicons ka color like mention below using ternary operator depends on that value of rating, thus here below.
        <TouchableOpacity key = {i} onPress={() => setRating(i)} style = {styles.starButton}>
          <Ionicons
            name = {i<=rating ? "star" : "star-outline"}
            size={32}
            color={i<=rating ? "#f4b400" : "COLORS.textSecondary"}
          />
        </TouchableOpacity>
      )
    }

    // step425: finally render the arrays here , thus here below ; and since its not a simple text, so we must enclose it in a {}, thus here below.
    return <View style={styles.ratingContainer}>{stars}</View>
  }

  return (
    // step414: lets wrap all with KeyboardAvoidingView to prevent the keyboard from covering the input fields, thus here below.
    <KeyboardAvoidingView
      style = {{ flex : 1 }}
      behavior = {Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* step415: lets use the scrollView component of recat native as we need to be able to scroll in the screen here, thus here below. */}
      <ScrollView contentContainerStyle = {styles.container} style = {styles.scrollViewStyle}>
        <View style = {styles.card}>
          {/* step416: so first we will have the header add the top, thus here below. */}
          <View style={styles.header}>
            <Text style={styles.title}>Share Book Recommendation</Text>
            <Text style={styles.subtitle}>Share and discover great books with others</Text>
          </View>
          
          {/* step417: now lets have the form to be filled, thus here below. */}
          <View style={styles.form}>
            {/* step418: first the book title on the top, thus here below. */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Book Title</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name = "book-outline"
                  size={20}
                  color={COLORS.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder='Enter the book title'
                  placeholderTextColor={COLORS.placeholderText}
                  value={title}
                  onChangeText={setTitle}
                />
              </View>
            </View>

            {/* step419: now lets add the rating section, now thus here below. */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Your Rating</Text>

              {/* step426: now finally we call the function here below , using {} as react sees normal text as HTML and so for functions and other JavaScript, we need to use {} thus here below. */}
              {renderRatingPicker()}
            </View>

            {/* step427: now lets have the adding of the image section, thus here below. */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Image of the book</Text>

              {/* step428: so now lets have a button to add the button, thus here below. */}
              <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>

                {/* step427: now we will do a conditional rendering of image here ; where the placeholder will be there if image is not selected ; else the image will be previewed here, thus here below. */}
                {image 
                // step428: so if image is not null i.e. selected, we show that image ; and Image component expects an object , so we use {{}} , as the outer {} is to indicate a JSX javascript by rule and inner is an object that Image component expects by rule, thus here below.
                ? (
                  <Image
                    source={{uri:image}} // where uri will have the string path of the image to be loaded, thus here below.
                    style={styles.previewImage}
                  />
                ) 
                // step429: else if the image is null, we show the placeholder, thus here below.
                : (
                  <View style={styles.placeholderContainer}>
                    <Ionicons name = "image-outline" size={40} color={COLORS.textSecondary} />
                    <Text style={styles.placeholderText}>Select an image</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            {/* step444: now lets have the caption box now, thus here below. */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Captions</Text>
              <TextInput
                style = {styles.textArea}
                placeholder='Mention your thoughts and opinions about this book here...'
                placeholderTextColor={styles.placeholderText}

                // step445: so the value of the textbox will be automatically be equal to the value of "caption" state ; thus it is a controlled component ; so everytime we write something or erase from here , the onChangeText runs and the setCaption recieves the typed text ; thus it updates the value of "caption" state and thus in turn sets the value of the textbox to whatever user types, so that it stays there and not vanishes , bu normal logic of React ; thus here below ; so whenever user types any character, react updates "caption" when setCaption("char") runs and UI re-renders to show that "char" in the textbox there ; so that data is not lost even on refresh there, so thus state variable and function are always needed in textboxes like these, thus here below.
                value = {caption}
                onChangeText={setCaption}
                multiline // to allow pressing of enter to enter multiple line thoughts there too, thus here below.
              />
            </View>

            {/* step446: now lets have the submit button, now thus here below. */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit} // call this function when pressed
              disabled={loading} // disabled == true when loading is true, thus here below.
            >

              {/* step447: so we render the activity indicator component when the loading state is true, else show the Publish text, thus here below. */}

              {/* step448: can put "true" here below in the conditional rendering below to see how that loading looks there, thus here below. */}
              {loading 
              ? (
                <ActivityIndicator color={COLORS.white} />
              )
              : (
                // step449: always if two components are to be rendered together, we need to wrap them in a React fragment, thus here below ; as they cannot be two components independent of eac other, wither put them inside a parent View or if not , like this inside a react fragment, then they are independent of each other and thus then can be rendered together, thus here below.
                <>
                  <Ionicons
                    name="cloud-upload-outline"
                    size={20}
                    color={COLORS.white}
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.buttonText}>Publish</Text>
                </>
              )
              }

            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}