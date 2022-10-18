import '../styles/globals.css'
import {MoralisProvider} from "react-moralis"
import {NotificationProvider} from "web3uikit"

//we want to wrap our app around this moralis provider
//    <MoralisProvider initializeOnMount ={false}>   the optionality to hook into a server to add some optionality //and features to our website
//we set it to false b/c we dont need that functionality 
//wrapping our component into our NotificationsProvider tag
function MyApp({ Component, pageProps }) {
  return ( 
    <MoralisProvider initializeOnMount ={false}>  
      <NotificationProvider>
        <Component {...pageProps} />
      </NotificationProvider>
    </MoralisProvider>
  )
}

export default MyApp


//hooks allow function components to have access to state and other react features 
//class componets arent needed
