// step297: zustand store needs the "create" function from "zustand" package to create the store, thus here below.
import {create} from "zustand"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { API_URL } from "../constants/api"

// step298: now lets create the store and export it too ; so that the functions or states in it can be accessed from anywhere, where this store will be imported there, thus here below.

// step300: we have the pre-defined functions "set" and "get" here below, that are used to set/change the value of state using that function anytime & "get" is used to get the current value of any state in the store at anytime, thus here below.
export const useAuthStore = create((set,get) => ({
    // step299: whatever we return inside this object will be the states of the store, and will be accessible from anywhere in the app, thus here below.

    // step301: for example if we have these below functions for testing, we can now go in signup.jsx file and import this store there, thus here below.

    // step302: so see the next steps in signup.jsx file now there.
    /* user: { name: "Nischay" },
    sayHello: () => {
        console.log("Hello")
    },

    setUser: (user) => {
        set({user: user}) // uses the "set" method to set the / update the value of the state "user" globally everywhere wherever being used to the "user" parameter sent to this function when being called there ; thus here below.
    } */

    // step308: so above all were testing states and functions , so lets start serious fresh now, thus here below.

    // step309: let the user and token state be null initially and will be fetched from the backend later and updated later, thus here below.
    user: null,
    token: null,

    // step310: and lets make the loading state here only that will be imported and used in other files when needed there & its also thus here below : initially false because we don't want to show loading screen by default, thus here below.
    isLoading: false,

    // step625: so now we create a state to check for the authentication, which will be true initially as , when we start the application, we always check for authentication, so we set it to true initially, thus here below.
    isCheckingAuth: true,

    // step311: now we will have the functions here below ; first lets have the register function, thus here below.

    // step312: it will use the username, email and password to register the user, thus here below.
    register: async (username, email, password) => {

        // step313: now before the register occurs we set the loading state to be true, so that we can show the loading screen while the register is going on, thus here below.
        set({isLoading: true})
        try{

            // step314: so we now send a fetch request to the endpoint we made in backend to register the user.
            const response = await fetch(`${API_URL}/auth/register`,{

                // step315: since the endpoint we made in backend was a POST request, so we have to send a POST request here too, thus here below.
                method: "POST",

                // step316: then we send the extra information if any by rule in "headers" ; so here we send the Content-Type as "application/json" in header, which tells the server that we are sending json data, thus here below.

                // step317: so this tells the server that the body will be sent as JSON ; and so the server uses the appropriate parser method there ; like JSON.parse() there in backend to parse the JSON data correctly into the format it expects, thus here below.
                headers: {
                    "Content-Type": "application/json"
                },

                // step318: we should thus convert the JavaScript object back to actual JSON string format to be sent as body to the server now ; because HTTP request bodies cannot contain raw JS objects ; and : { username: username, email: email, password: password } : this is not JSON, its a JS object stored in memory, so we convert it to JSON string format first to be sent to the server as JSON body, thus here below ; and there it will parse using JSON.parse() there in backend to parse the JSON data correctly into the format it expects as we have told already in header as the extra information that the body we are sending will be of the JSON format, thus here below.
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password
                }),
            })

            // step319: now we get back the response backend sends in the "response" variable above ; and fetch the data from that thus here below.

            // step320: response sent by server is never a JSON object, but a raw text from the server ; so we must convert it to JSON object to use it, thus here below.
            const data = await response.json()

            // step321: now it checks that response came with status code between 200-299 or not ; if yes then the request succeeded and we got response.ok true but if came with status code between 400-599 then the request failed and we got response.ok false, thus here below.
            if(!response.ok){
                // step322: so we throw error with the error message that came with data from the server and if server didn't send any message i.e. if message is undefined then it throws the default error message, thus here below.

                // step323: now see the next steps in step324.txt file now there.
                throw new Error(data.message || "Something went wrong");
            }

            // step325: so now we store the data as well as the token in the async storage of the mobile app, thus here below.

            // step326: so this async storage : It lets you save data permanently on the device, even after the app closes ; So if a user logs in → the data stays saved → they stay logged in next time ; in backend we returned "data" that contained "token" seperately there and also a "user" object in it ; so we extract the user object from "data" and get the convert to string as AsyncStorage can only store strings, not objects ; so we saved the user data under the key "user" in the async storage and the token under the key "token" in the async storage, thus here below.

            // step327: no need to do stringify for token as by rule : data.token is already a string (example: "abc123xyz") ; so : AsyncStorage only accepts strings → and token already is one ; so we just save it directly under the key "token" in the async storage, thus here below.

            // step328: can later access them using "getItem" method by passing this "key" we have set here thus into it, thus here below.
            await AsyncStorage.setItem("user", JSON.stringify(data.user))
            await AsyncStorage.setItem("token", data.token)

            // step329: now lets update the states using the "set" emthod of zustand store too, thus here below.

            // step330: so we set the token to the new token adn user to the signned up user and also make the loading state false again as the register is done ; so loading state can be turned back false thus here below.
            set({token: data.token, user: data.user, isLoading: false});

            // step331: finally lets give a response back too from here, thus here below.
            return{
                success: true
            }
        }
        catch(error){
            // step332: if anything goes wrong, we still set back loading state to be false as the register is done, event hough it failed but its done so now ; so loading state can be turned back false thus here below.
            set({isLoading: false})

            // step333: and then lets give a response back too from here, thus here below.

            // step334: see the next steps in signup.jsx file now there.
            return{
                success: false,
                error: error.message
            }
        }
    },

    // step361: now similar to signup function, lets implement the logic for the login function here below ; and it takes just the email and password as parameters, thus here below.
    login: async (email, password) => {
        // step362: we first set the loading state to true because now we are going to make a request to the backend to login the user and the request will take some time so we set the loading state to true, thus here below.
        try{
            // step363: done same as done in register method, so can look there for reference if needed, thus here below.
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json" // helps to tell the server that the body will be sent as JSON , so be ready to parse it there using JSON.parse(), thus here below.
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            // step364: now lets get the response data from server after parsing it to JSON, because response sent by server is never a JSON object, but a raw text from the server ; so we must convert it to JSON object to use it, thus here below.
            const data = await response.json()

            // step365: then again do the response.ok thing done in register method too, so can look there for reference if needed, thus here below.
            if(!response.ok){
                throw new Error(data.message || "Something went wrong");
            }

            // step366: now update the async storage and add the user and token there, thus here below.
            await AsyncStorage.setItem("user", JSON.stringify(data.user))
            await AsyncStorage.setItem("token", data.token)

            // step367: now lets update the states using the "set" method of zustand store too so that it gets updated at all the places where this store is imported globally, thus here below.
            set({token: data.token, user: data.user, isLoading: false})

            // step368: now lets give a response back too from here, thus here below.
            return{
                success: true
            }
        }
        catch(error){
            // step369: again like the register function here also we first set back loading state to be false as the login is done, even though it failed but its done so now ; so loading state can be turned back false thus here below.
            set({isLoading: false})

            // step370: and then lets give a response back too from here, thus here below.

            // step371: go to index.jsx file of the (auth) folder now there ; CAN GO THERE BY SEARCHING FILE NAME EASILY BY PRESSING : CTRL + P : IN VS CODE HERE NOW.
            return{
                success: false,
                error: error.message
            }
        }
    },

    // step347: so now lets have a function to get the token of the authenticated user from the async storage if any, to verify if user is authenticated or not, thus here below.
    checkAuth: async () => {
        // step348: we if signup on app now using a new account , it will create account and save on the database ; and if we console log user and token at the moment, it will show the user and token there ; but later if we reload the app there OR refresh it, then we will see "null" again there as then this file runs again from scratch and like initialized above, it will set all those values back to "null" there ; but like we did earlier those values got stored in async storage, so lets try to fetch it from there now, thus here below.
        try{
            // step349: so lets get them from async storage using the key name with which we had stored it there in the async storage, thus here below.
            const token = await AsyncStorage.getItem("token")

            // step350: since the user was stored as string always in the async storage, so we get the string format of data in "userString" below.
            const userString = await AsyncStorage.getItem("user")

            // step351: but we want to have the string back as object, so we convert it to object, thus here below.
            const user = userString ? JSON.parse(userString) : null // if its not null then parse it to object, else set it to null only, thus here below ; as if async storage has no token it may return null, so then keep the token as null only thus there.

            // FINALLY WE UPDATE THE STATES GLOBALLY EVERYWHERE TO BE THE VALUES FROM THE ASYNC STORAGE, thus here below.
            set({token: token, user: user})

            // step352: see the next steps in index.jsx file of app root directory folder now there.
        }
        catch(error){
            console.log("Auth check failed due to some error", error);
        }

        // step626: so then in this function of checking auth, in the finally block, which is executed always whetehr the try block ran or catch block ; so here in finally, we set the isCheckingAuth to false ; this is done because when app starts token is null, so app checks if user is authenticated, redirects to login for a split second then checkAuth function runs there and sees that user is actually logged in, so takes back to home scren again, thus the screen flickers for a split second of time there, thus here below.

        // step627: see the next steps in (auth)/index.jsx file now there.
        finally{
            set({isCheckingAuth: false})
        }
    },

    // step357: now lets implement the logout function here below.
    logout: async () => {
        try{
            // step358: so now we remove the token and user from async storage using the removeItem function along with the key name with which it was saved there, thus here below.
            await AsyncStorage.removeItem("token")
            await AsyncStorage.removeItem("user")

            // step359: also we update the states globally everywhere to be null, thus here below.

            // step360: now when we click on this button there, this fucntion gets called and removes the token and user from async storage, making the states null and thus the user is logged out by being unauthenticated, thus here below.
            set({token: null, user: null})
        }
        catch(error){
            console.log("Logout failed due to some error", error);
        }
    }
}))