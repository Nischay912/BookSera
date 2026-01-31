import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../../store/authStore'
import styles from '../../assets/styles/home.styles'
import { API_URL } from '../../constants/api'

// here we use the image from expo, as thats what we using here below and so not from react-native, thus here below ; because we used Image with source without URI too belo, thats possible in Image of expo and not of react-native, thus here below.
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import COLORS from '../../constants/colors'
import { formatPublishDate } from '../../lib/utils'
import Loader from '../../components/Loader'

// step544: we now create a sleep function to add some delays if needed, thus here below.

// step545: so this function creates a pause/delay of "ms" milliseconds ; A promise returns something that will finish later ; it has 2 states pending and resolved ; so here : "resolve" is a function provided by JavaScript, which means when "Resolve()" is called means Promise is done ; so : setTimeout(resolve, ms) : it means that we call the resolve() function after "ms" milliseconds ; so overall here : sleep(ms) will return a Promise ; the Promise resolves after "ms" milliseconds and await waits for the Promise to resolve and thus add a delay of "ms" milliseconds and after that the code after await will be executed/ will continue from where it stopped/paused due to the delay, thus here below.
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export default function Home() {
  // step473: lets get the token for the logged in user from the useAuthStore hook, thus here below.
  const {token} = useAuthStore()

  // step474: now lets get the many states to be used here, thus here below.
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [page, setPage] = useState(1) // to keep track of which page we are in, default we are at 1st page, thus here below.

  // step475: to tell if we have more books to fetch or not ; as here we will implement pagination, i.e. not load all books at once to prevent overloading ; and thus fetch and show like 5 books at a time, page by page, thus here below ; this set here to "true" initially to show that we have more books to fetch, thus here below.
  const [hasMore, setHasMore] = useState(true)

  // step477: here we will create the function to fetch the books here, thus here below ; we keep default page as "1" if page number not passed, and refresh as false by default so that assuming not to refresh the old data with new one if refresh "true" not sent here, thus assumes then it as "false" by default here, thus here below.
  const fetchBooks = async (pageNum=1, refresh=false) => {
    try{
      // step493: now lets check first if we are refreshing the page or not ; and update the state accordingly, thus here below.
      if(refresh === true){
        setRefreshing(true)
      }

      // step494: else if we are not refreshing , but the page number is "1", then we set the loading to true to show the loading spinner for the first time when the page 1 coming ther, without us refreshing the page ; because this fetchBooks was called in useEffect when the page loaded first time, so then we show loading spinner there when at page1 for the first time and not refreshing there, to load the page1 books, thus here below.
      else if(pageNum == 1){
        setLoading(true)
      }
      // step495: now lets make the GET request to the /books API, in backend, and in backend bookRoutes, we saw we will pass two query parameters, i.e. the page number and the limit to be shown on one page i.e. 5 books on 1 page lets say here, then when scrolled, show next 5 pages , like that pAGINATION being done here, thus here below ; so pageNum == 1 initially and then as we scroll , it will be incremented one by one there, thus here below.
      const response = await fetch(`${API_URL}/books?page=${pageNum}&limit=5`, 
        {
          // step496: then we send this special header token to tell server we are authenticated by sending the logged in user token for authentication and security purposes there, thus here below.
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      // step497: then we get the data from the backend parsed back into JSON i.e. a javascript object, thus here below.
      const data = await response.json();

      // step498: then check for errors using the response.ok property, thus here below.
      if(!response.ok){
        throw new Error(data.message || "Something went wrong")
      }

      // step499: then finally we update the books array state with the recieved book from the database, thus here below.

      // step500: the backend had stored the books = [{}, {},...] like this 5 books there as we sent limit 5 for 1 page , thus here below.
      
      // step501: whenever we have a setter function to update a state, then React gives us feature to write some variable name in () like here we used "prevBooks" to load the current value of the state, and then so initially prevBooks = [] and lets say data.books = [a b c d e] ; so now we use spread operator to keep the current state as it is and then append the new value to the end, NOT OVERRID THEM ; so this line : [...prevBooks, ...data.books] means : [...[], ...[a b c d e]] : which becomes [a b c d e] ; note that we can't do [...prevBooks, data.books] as it means : [...[a b], [c,d]] = [a b [c d]], but we want all to be opened and spread, not saved as array itself, so used "..." spread operator for both the arrays here, thus after setBooks we have books = [a b c d e] ; now when user scrolls and comes to page2 , then data.books = [f g h i j] and so now [...prevBooks, ...data.books] = = [...[A, B], ...[C, D]] = = [A, B, C, D] , thus here below.

      // setBooks((prevBooks) => [...prevBooks, ...data.books])

      // step520: the above line wa slater giving some errors and the same item was being duplicated : beacause this above line : setBooks((prevBooks) => [...prevBooks, ...data.books]) : always appends and never checks for duplicates ; so if page1 is fetched twice or scrolled is fired twice or we refresh page1 again, it just adds the same book "_id" again as no check was done above like : [a b c d e a b], thus here below.

      // step521: so now we check that if we are refreshing or the page is 1 , then we replace the content with the data.books instead of appending, as on page1 , the book list returned has to be there, so directly put there & also if user refreshes, he goes ot page1 by default and show only page1 books there, thus here below, not append ; thus here below.

      // if(refresh === true || pageNum === 1){
      //   const uniqueBooks = data.books;
      // }

      //  THE ABOVE CODE WILL CAUSE ERROR AS WE DECLARE CONST INSIDE IF-ELSE, THEN WE CAN'T USE IT OUTSIDE FINALLY IN SETBOOKS, THUS HERE BELOW ; SO BETTER TO USE TERNARY OPERATOR, THUS HERE BELOW.

      const uniqueBooks = refresh === true || pageNum === 1 

      ? data.books

      :

      // else{
        // step522: else if its not the case , and we are not on page1 and are not refreshing ; then we first use the same like previous and extract the _ids from them by mapping them like : [...books, ...data.books].map((book) => book._id) : so we get -> [1 2 3 4 5 1 2] : may have duplicates ; so we arap with Set as bby rule SET HAS ONLY UNUIQUE VALUES and it automatically removes the duplicates, thus here below.

        // step523: so we convert it to array too using Array.from, thus here below.

        // step524: then we have : [1 2 3 4 5] ; so now : we need to convert back based on these unique id's to full book objects, thus here below ; so using the 2nd map, we map throught the unique id's array we got & then for each unique id, we find the actual book object in the data from database and keep only one copy of each of them ; as now we itearte through the unique id's array and for each unique id, we find the actual book object in the data from database and thus in this way only once each unique id's book object is rendered, thus here below.

        Array.from(
          new Set([...books, ...data.books].
            map((book) => book._id))
        ).          
          map((id) => [...books, ...data.books].find((book) => book._id === id));

      // step525: then finally we update the books array state with the recieved book from the database, thus here below.
      setBooks(uniqueBooks)

      // step502: now we also check if we should fetch more pages or stop ; as if lets say based on total books in database, the total pages possible was sent by backend ; like lets say data.totalPages was 3 ; then pageNum=1 initially , so 1 < 3 , so its true, hasMore = true , thus here below; we have < and not <= as when 3 < 3 there, we stop as no more pages can be there ; but if it was 3 <=3 , then even if last page reached, we again would have said hasMore = true , can fetch more, BUT ITS FALSE, SO THATS WHY WE HAVE < and not <= here, thus here below.
      setHasMore(pageNum < data.totalPages)

      // step503: finally now we set the page to pageNum = 2 after loading page2 , then pageNum= after loading page 3 and so on..., thus here below.
      setPage(pageNum)
    }
    catch(error){
      console.log("Error in fetching books", error);
    }

    // step504: we reset the states in finally block, because even if books loaded successfully or not , but in both if and else after both of them, we should stop showing refresh icon or loading icon there by logic, so we write that in finally block as we know that finally will run after both if and else blocks, thus here below.
    finally{

      // step505: so like we had the if and else if for the setting of these to true, so in same way reset them based on condition only by logic, thus here below.
      if(refresh === true){

        // step546: so now we add some delay here before the refreshing state becomes false, so that the refreshing state remains true for longer time there and when we pull down, the refresh icon stays for 0.8 more seconds there, thus here below.

        // step547: see the next steps in profile.jsx file now there, thus here below.
        await sleep(800);
        setRefreshing(false)
      }
      else{
        setLoading(false)
      }
    }
  }

  // step476: now lets write a useEffect that runs only once when the home page is visited at start only once, so we have [] empty dependency array, thus here below.
  useEffect(() => {
    fetchBooks();
  }, [])

  // step478: now we create a function here to load more books as we reach the end of the page, to load the next page with next set of books there, thus here below.
  const handleLoadMore = async () => {
    // step529: now lets do here that if more pages are there to be loaded and we are not loading the screen currenlty and not refreshing the page, then lets fetch the next page, thus here below.
    if(hasMore && !loading && !refreshing){

      // step530: so then we call the the fetchBooks function with the page number incremented by 1 ; so that the fetchBooks function after doing current page books from database, now loads the next set of books of next page there, thus here below.
      await fetchBooks(page + 1)
    }
    
  }

  // step486: now lets write the function which will be called for each item of the FlatList, thus here below.

  // step487: now the renderItem of FlatList sends { item : books[0], index: 0, .... } , so we destructure the {item} from it to use it ; and get the item from it to use it here below, thus here below.
  const renderItem = ({item}) => (
    <View style={styles.bookCard}>
      {/* step488: so first we will have the header for each item , with the profile pic and username of the person who uploaded the book, thus here below. */}
      <View style={styles.bookHeader}>
        <View style={styles.userInfo}>

          {/* step489: so the image being shown here is accessed from "books[0]" lets say when is item, then in that user is userid and from that go to that user document and get the profileImage URL and username, thus here below. */}

          {/* double {{}} as source expects object, so we put {} for the object inside the outer normal JSX {}, thus here below. */}
          
          <Image source={{ uri : item.user.profileImage }} style = {styles.avatar} /> 

          <Text style={styles.username}>{item.user.username}</Text>
        </View>
      </View>

      {/* step490: now we will render the book's image here now, thus here below. */}
      <View style={styles.bookImageContainer}>

        {/* step491: here we don't put {{}} as item.image is itself an object in the "uri" format required by the "sourcE" property of Image component of react-native imported and being used here below, thus here belwo ; unlike the "uri" one thta we wrote there above, earlier there, thus here below. */}

        {/* step492: we use content-fit to cover the entire container without distortion, thus here below. */}
        <Image source={item.image} style={styles.bookImage} contentFit="cover" />
      </View>

      {/* step507: so now after the image, we render the stars rating and other book details, thus here below. */}
      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{item.title}</Text>

        {/* step508: render the stars based on the rating of the item recieved from the mongoDB database for the books stored, thus here below. */}
        <View style={styles.ratingContainer}>
          {renderRatingStars(item.rating)}
        </View>

        {/* step509: now we put the caption, thus here below. */}

        {/* step510: see the next steps in utils.js file now there, thus here below. */}
        <Text style={styles.caption}>{item.caption}</Text>

        {/* step519: now lets get the date of upload of the book, thus here below. */}
        <Text style={styles.date}>Published on {formatPublishDate(item.createdAt)}</Text>
      </View>
    </View>
  )

  // step506: so now here we define the star's render function in same way as we wrote in the create page, thus here below.
  const renderRatingStars = (rating) => {
    const stars = []
    for(let i=1 ; i<=5 ; i++){
      stars.push(
        <Ionicons
          key={i}
          name={i<=rating ? "star" : "star-outline"}
          size={16}
          color={i<=rating ? "#f4b400" : COLORS.textSecondary}
          style = {{marginRight: 2}} // always use double {{}} when passing a Js object inside the JSX {....} component, thus here below.
        />
      )
    }
    return stars;
  }

  // step534: so now if the loading state is tru, we return the following loading spinner there using the "ActivityIndicator" component of react-native, thus here below.
  if(loading){
    return (
      // step535: can put this instead in a component Loader.jsx, so that it can be used mutliple places, wherever needed, thus here below.
  
      // step536: so see the next steps in Loader.jsx file now there, thus here below.

      /*
      <View 
        style={{ // double {{}} used as we are passing a Javascript object in it , and want all of these styles to be implemented at once, thus here below.
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.background
        }}
      >
        <ActivityIndicator size={20} color={COLORS.primary} />
      </View>
      */

      <Loader size = "large" /> // large sized made, can thus now make it any sized like "small" , "60" , so on...., thus here below.
    )
  }

  return (
    // step479: lets build the UI first, thus here below.
    <View style={styles.container}>
      {/* step480: here we will use "FlatList" which works similar to the map of "react", thus here below. */}
      <FlatList
        // step481: the data to be rendered or the data to be traversed on ; so FlatList loops over this data internally here, thus here below.
        data = {books} 

        // step482: now we have the function to tell how to render each item of the FlatList ; this function will be called for each item of the data, thus here below.
        renderItem={renderItem}

        // step483: now like maps of React, FlatList needs keys too, so we extract the key from item from MongoDB present as "_id" there by rule and assign here, thus here below.
        keyExtractor={(item) => item._id}

        // step484: now we give styles to be applied to the inner container of the list ; not on the FlatList itself, but on the container for padding margin, etc ; thus here below.
        contentContainerStyle={styles.listContainer}

        // step485: now we dont want a vertical scroll bar, thus here below.
        showsVerticalScrollIndicator={false}

        // step526: we have a header component in FlatList that helps to give a header to the list, thus here below.
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>BookSera</Text>
            <Text style={styles.headerSubtitle}>Discover the best books from the community</Text>
          </View>
        }

        // step527: now if the data is empty i.e. data = {[]} above ; then we will render the follwing component in the FlatList, thus here below.
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="book-outline" size={60} color={COLORS.textSecondary} />
            <Text style={styles.emptyText}>No books published yet! 😕</Text>
            <Text style={styles.emptySubtext}>Be the first to publish a book now !</Text>
          </View>
        }

        // step528: now when  the user reaches the end of the list, the following function gets called, thus here below ; and we want the function to be called just before the user reaches the end ; so that the user experiences better UI , like not like books not there ans suddenly appears by end of the list, rather just as its about to reach the end of the FlatList, then it should call the following function to load the next set of pages there, just as its about to reach the end, using the THRESHOLD, thus here below.
        onEndReached = {handleLoadMore}
        onEndReachedThreshold={0.1}

        // step531: now lets make a footer component, which is a component that appears at the bottom of the FlatList, thus here below.

        // step532: so we will show the activity loader spinner if more pages are there to be loaded and number of books to be loaded are still there, and if database taking some time to load them, then show there a spinner to look the UI look good, thus here below.
        ListFooterComponent={
          hasMore && books.length > 0 ? (
            <ActivityIndicator style={styles.footerLoader} size="small" color={COLORS.primary} />
            // step533: now if there are no more pages to be loaded, then show the following message i.e. NULL, thus here below.
          ) : null
        }

        // step539: now we will add a pull down to refresh feature using the RefreshControl, thus here below.
        refreshControl={
          // step540: so now we use the RefreshControl component, thus here below.
          <RefreshControl
            // step541: so it will be refreshing only when the refreshing state is true, thus here below.
            refreshing={refreshing}

            // step542: then we set that on refreshing, it calls this function below with pageNum = 1 and refresh stae = true that was passed as parameter there ; i.e. on refreshing we set page number back to 1 , thus here below.
            onRefresh={() => fetchBooks(1, true)}

            // step543: then we can also set the color of the spinner, thus here below.
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
      />

    </View>
  )
}