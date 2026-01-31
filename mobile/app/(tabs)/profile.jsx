import { View, Text, Alert, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import { API_URL } from '../../constants/api'

// NOTE HERE THAT : WE CAN ALWAYS CHECK IF PATH IS CORRECT OR NOT BY DOUBLE CLICKING THE '../../store/authStore' BELOW AND THEN PRESS CTRL+SPACE, IF ITS CORRECT, IT WILL SHOW THE PATH TO THE FILE, thus here below.
import { useAuthStore } from '../../store/authStore'
import styles from "../../assets/styles/profile.styles"
import ProfileHeader from '../../components/ProfileHeader'
import LogoutButton from '../../components/LogoutButton'
import { Ionicons } from '@expo/vector-icons'
import COLORS from '../../constants/colors'
import { Image } from 'expo-image'
import { sleep } from './index'
import Loader from '../../components/Loader'

export default function Profile() {
  // step548: lets first write all the states needed to be used in this file, thus here below.

  const [books, setBooks] = useState([]) // to store all the book recommendations of the user

  // step549: the below states with same functionality that we implemented in index.jsx file of this (tabs) folder ; can see there for refernce if needed, thus here below.
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // step606: now lets create a state to help in showing a loading spinner at the place of the trash bin there when we click to confirm delete of a book there, thus here below.
  const [deleteBookId, setDeleteBookId] = useState(null)

  // TOKEN TO BE USED TO SEND WITH REQUEST IN AUTHORIZATION HEADER, TO CHECK IF THE LOGGED IN USER MATCHES WITH THAT AUTHORIZED TOKEN OR NOT, AND THEN ONLY FETCH THE DATA FOR PROTECTION AND SECURITY REASONS, thus here below.
  const { token } = useAuthStore();

  // step550: lets also get the router to be used to navigate between screens, thus here below.
  const router = useRouter();

  // step551: now lets write the function to fetch the data from the database, thus here below.
  const fetchData = async () => {
    try {
      // step552: now first when loading the data, we set loading true, to show the loading spinner there, thus here below.
      setIsLoading(true)

      // step553: then we send a request to the user endpoint with the Authorization header, which is a built-in header in fetch API, to tell the server we are authenticated by sending the logged in user token for authentication and security purposes there, thus here below.
      const response = await fetch(`${API_URL}/books/user`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      // step554: then we get the data parsed to json format back and then check using response.ok if the request was successful or not, thus here below.
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.messsage || "Failed to fetch the user's books")
      }

      // step555: else if successful, then we update the books state with the data, thus here below.
      setBooks(data)
    } 
    catch (error) {
      console.log("Error in fetching the user's books", error);
      Alert.alert("Error", "Failed to load profile data. Pull down to refresh.");
    }

    // step556: and then we set back the loading state to false in a finally block because even if control was in try or catch, but still at the end we want to stop the loading spinner there, so set back the loading to false in finally block, as by rule finally block runs regardless of try or catch block, thus here below.
    finally {
      setIsLoading(false)
    }
  }

  // step557: now we will be calling this function, when the screen is rendered for the first time only once, so use an useEffect with empty dependency array, thus here below.
  useEffect(() => {
    fetchData();
  }, []);

  // step588: so now lets create the function to show the UI for each of the item of flatlist to be rendered there, thus here below.

  // step589: now the renderItem of FlatList sends { item : books[0], index: 0, .... } , so we destructure the {item} from it to use it ; and get the item from it to use it here below, thus here below.

  /* step590: REMEBER HERE IMPIRTANT NOTE THAT : the below code will not run because we are not defining a multiline function's rules here and then finally return at end , so we cannot use { ..... } like done here below ; instead if we want to use { .... } , then keep it as this below with "return" at top -

    const renderBookItem = ({ item }) => {
      return (
        <View style={styles.bookItem}>
          <Image source={item.image} style={styles.bookImage} />
          <View style={styles.bookInfo}>
            <Text style={styles.bookTitle}>{item.title}</Text>
          </View>
        </View>
      );
    };

    ; else we should use ( .... ) if we just have to return a single item there, thats why the below block of code didn't render the book items of the FlatList earlier there, thus here below.

  const renderBookItem = ({item}) => {
    <View style={styles.bookItem}>
      <Image source = {item.image} style = {styles.bookImage} />
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{item.title}</Text>
      </View>
    </View>
  }
  */

  // step593: lets copy-paste the function to render stars done in previous home index.jsx file already there, thus here below.
  const renderRatingStars = (rating) => {
    const stars = []
    for(let i=1; i<=5; i++){
      stars.push(
        <Ionicons
        // key is needed in maps we know, here using for loop also we are indirectly creating an array of eleents, so react expects a unique key for each of those collection of items, whererver they are tehre, whethere in map or array, being rendered on the screen whenever there, thus here below.
          key={i}
          name={i<=rating ? "star" : "star-outline"} // shape of each star based on rating , if rating is 3 and this star is 1st 2nd or 3rd onw , then shape it filled star, else not
          size={14}
          color={i<=rating ? "#f4b400" : COLORS.textSecondary} // color of each star based on rating , if rating is 3 and this star is 1st 2nd or 3rd onw , then color it gold, else not
          style = {{marginRight: 2}}
        />
      )
    }
    return stars;
  }

  // step599: so now lets create the function to do the deletion, thus here below.

  // step600: its written in same format like the logout button alert popup we wrote there earlier, thus here below.
  const confirmDeleteBook = (bookId) => {
    Alert.alert(
      "Delete Publishment",
      "Are you sure you want to delete this book's publishment?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => handleDeleteBook(bookId)
        }
      ]
    )
  }

  // step601: now lets write the function to handle the deletion, thus here below ; it will be an async function as we will be sending a request to the server to delete the book, thus here below.
  const handleDeleteBook = async (bookId) => {
    try{
      // step607: when the delete button is clicked, we set the state to non-null value, thus here below.
      setDeleteBookId(bookId);

      const response = await fetch(`${API_URL}/books/${bookId}`, {

        // step602: its a DELETE type request being sent to the backend, and we send th ein-built special header called "Authorization", which is a built-in header in fetch API, to tell the server we are authenticated by sending the logged in user token for authentication and security purposes there, so that no other user can delete the book by sending the requests there, thus here below.
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      // step603: now lets convert the response back to json format supported in frontend, and then check if there was any error or not there, thus here below.
      const data = await response.json();
      if(!response.ok){
        throw new Error(data.message || "Failed to delete the book");
      }

      // step604: now we can use the filter option, which returns a new array with all elements that pass the test implemented by the provided function, thus here below ; so here below it will only return the books whose id is not equal to the book to be deleted and update the state with it, thus the new array in books will not have the book to be deleted there, thus here below.
      setBooks(books.filter((book) => book._id !== bookId));

      // step605: now can check deleting a book, and then it will be deleted from mongoDB as well as its image will be deleted from cloudinary as well absed on code of backednwe wrote for delete at that endpoint, thus here below.
      Alert.alert("Success", "Recommendation deleted successfully!");
    }
    catch{
      Alert.alert("Error", error.message || "Failed to delete the recommendation");
    }

    // step608: and finally when deletion completed, we set back the state to null, thus here below.
    finally{
      setDeleteBookId(null);
    }
  }

  const renderBookItem = ({item}) => (
    <View style={styles.bookItem}>

      {/* step591: we will here use the image content directly without "uri", so for that we import Image from expo-image and not from react-native as it needs the image path as string in the "uri" property, thus here below. */}
      <Image source = {item.image} style = {styles.bookImage} />
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{item.title}</Text>

        {/* step592: then to show the star rating there, we can use the following function to render the stars there, thus here below. */}
        <View style={styles.ratingContainer}>
          {renderRatingStars(item.rating)}
        </View>

        {/* step594: now after the stars we want to put the caption, thus here below. */}

        {/* step595: we can put numberOfLines limit here, so that if it not fits in one line, then it will show ellipsis i.e "...." there, thus here below ; to prevent that just remove the numberOfLines property from the Text component present here below, thus here below. */}
        <Text style={styles.bookCaption} numberOfLines={2}>
          {item.caption}
        </Text>

        {/* step596: now lets put the date published on, thus here below ; so we use new Date to convert the MongoDB date format to JavaScript Date Object and so now JS knows year month day time , and then use .toLocaleDateString() to format it into locale date format based on machine, thus here below. */}
        <Text style={styles.bookDate}>

          {/* "en-US" for MM/DD/YYYY and "en-GB" for DD/MM/YYYY, thus here below. */}

          {/* Use toLocaleDateString() to have date there only, and toLocaleString() to have date and time both there, thus here below. */}
          {new Date(item.createdAt).toLocaleDateString("en-GB")} 
        </Text>
      </View>

      {/* step597: now lets have a button to delete the book, thus here below. */}
      <TouchableOpacity
        style = {styles.deleteButton}

        // step598: we will call the below function when the button is clicked in which we pass the id of the item whose delete icon was clicked here, thus here below.
        onPress={() => confirmDeleteBook(item._id)}
      >
        {/* <Ionicons name="trash-outline" size={20} color={COLORS.primary} /> */}

        {/* step609: so now we will not show the above icon immediately, but check the state of deleteBookId first, we had set it to nun-null value after delete was pressed, and its null when delete icon not pressed ; so we show a loading spinner there, if the state is not null i.e. show spinner when delete pressed, else show the trash icon, thus here below. */}
        {deleteBookId === item._id 
        ? (
          <ActivityIndicator size="small" color={COLORS.primary} />
        )
        : (
          <Ionicons name="trash-outline" size={20} color={COLORS.primary} />
        )
      }

      </TouchableOpacity>
    </View>
  )

  // step614: now lets try to form the function to be called when the screen is pulled down to refresh, thus here below.

  // step615: it will be an async function as here we will be using the "sleep" function that uses "AWAIT" O FOR AWAIT FUNCTIONS WE KNOW BY RULE WE NEED "ASYNC", that why its used here, thus here below ; it is the same sleep function that we had made in home screen page index.jsx to cause some delay in refrehsing to mak eit look realistic and show spinner for some delay there, instead of instant refreshing as it will not look too realistic if refresh happens instant, rather show spinner for some delay time there using the sleep function, thus here below.
  const handleRefresh = async () => {
    // step616: we started the refresh process, so set refreshing to be true to show the refreshControl there in FlatList as it renders only when the state isRefreshing is true,we had set there ;thus here below.
    setIsRefreshing(true);

    // step619: the refreshing icon came and gone very fast now on pulling sown to refresh there ; so we added export to the "sleep" function made in home screen index.jsx there, and then import and use it, thus here below ; for the same purpose told in the above step615 there, thus here below.
    await sleep(500)

    // step617: then lets fetch the data again after refresh again ; as by logic thats only what happens in a refresh by pull-down, it fetches the data again from scratch, so we fetch data again now, thus here below.
    await fetchData();

    // step618: then finally set the refreshing state to false to stop showing the refresh component of flatlist there as it renders only when the state isRefreshing is true that we had set in the FlatList's refreshcontrol component earlier there, thus here below.
    setIsRefreshing(false);
  }

  // step620: now finally whenever we press "r" in terminal OR when we come to this profile screen for the first time there, we see the text of empty array there for some seconds, as its the time when its loading the data from backend there, so instead of showing that, we show the loading spinner there that we made in the Loader.jsx file i.e. in the Loader component, thus here below.

  // step621: can see how it looks by writing "true" in the if condition below just for testing how it looks there, thus here below too, thus here below.
  // if(isLoading){
  //   return <Loader />
  // }

  // step622: but now we see that if we just refresh the book list there, the loader of screen also show there, but it looks weird , so we show the loader only if its loading and we not refreshing, if refreshing, then don't show the loader there, thus here below.

  // step623: see the next steps in step624.txt file now there.
  if(isLoading && !isRefreshing){
    return <Loader />
  }

  return (
    // step558: now lets write the UI for this screen, thus here below.
    <View style={styles.container}>
      {/* step559: so we will make seperate components for the profile header and logout button, thus here below ; so see the next steps in ProfileHeader.jsx and LogoutButton.jsx files now there. */}
      <ProfileHeader />
      <LogoutButton />

      {/* step578: now lets show the number of books at the top published by the user first, thus here below. */}
      <View style={styles.booksHeader}>
        <Text style={styles.booksTitle}>Your Recommendations 📚</Text>
        <Text style={styles.booksCount}>{books.length} books</Text>
      </View>

      {/* step579: now lets use a FlatList to display the books fetched from the database, thus here below. */}
      <FlatList
        data = {books}

        // step580: now we write the function to be called for each item in the FlatList, thus here below.

        // step581:so we can either create a component in components folder named BookRec.jsx for each item in the FlatList and render it there, thus here below OR just write the function to be called for each item in the FlatList, thus here below.
        // renderItem = {({item}) => (<BookRec item={item} />)}
        renderItem = {renderBookItem}

        // step582: now FlatList needs a unique id for each item in the FlatList ; so we get it from the "_id" of each document of the books from MongoDB, thus here below.
        keyExtractor={(item) => item._id}

        // step583: now we don't want scrolling, thus here below.
        showsVerticalScrollIndicator = {false}

        // step584: then we can put a style for the container , thus here below. 
        /*
        |---------------------|   ← style (FlatList)
        |                     |
        |   |--------------|  |   ← contentContainerStyle
        |   | item 1       |  |
        |   | item 2       |  |
        |   | item 3       |  |
        |   |--------------|  |
        |---------------------|

        ; so we see that style styles the outer box and contentContainerStyle styles the inner box scrolling content there, like spacing between the items and all, thus here below.
        */
        contentContainerStyle = {styles.booksList}

        // step585: then when the FlatList is empty, we show the following component there, thus here below.
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name = "book-outline" size={50} color={COLORS.textSecondary} />
            <Text style={styles.emptyText}>No books published yet!</Text>

            {/* step586: then we can have a button there to take us to the create screen to publish a book, thus here below. */}
            <TouchableOpacity
              style={styles.addButton}

              // step587: so we use the navigation router from expo-router to navigate to the create screen, thus here below ; it works like when React sees "/create", it finds the app/create.jsx file and renders it, thus here below ; router ignores specal folders like (tabs) and it takes us directly to the create.jsx inside the (tabs) folder ; if there was a create.jsx in root of app outside (tabs) folder, it would have gone to that too, and thus cause a conflict due to names; so we should keep the names different in these cases to prevent these and so it is a very important thing to use the router correctly in this way, thus here below.
              onPress={() => router.push('/create')}
            >
              <Text style={styles.addButtonText}>Publish Your First Book Now</Text>
            </TouchableOpacity>
          </View>
        }

        // step610: just like home screen index.jsx file, here also we will have the refresh component to show the refresh loader and refresh the screen when the screen is pulled-down to refresh there, thus here below.

        // step611: so we will refresh it only when the state of isRefreshing is true, thus here below.
        refreshControl={
          <RefreshControl
            refreshing = {isRefreshing}

            // step612: the below function will be called when the screen is pulled-down to refresh there, thus here below.
            onRefresh={handleRefresh}

            // step613: colors in refreshControl expects an array, whereas the tintColor expects a single color, thus here below ; thats why {} in tint color, whereas {[...]} in colors done here below, thus here below.
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
      />
    </View>
  )
}