import {useMoralis} from "react-moralis"
import {useEffect} from "react"

// if placed right here     let connected = false // won't render
// component doesn't about this changing
//hooks allow us to keep track of states in between renders 

export default function ManualHeader(){
    //dectiveweb3 sets enableweb3 to false
                                                                    //checks to see if metamask is popped up
    const {enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading} = useMoralis() //it is a hook/ it is a way to keep track of the state in our applcaiton
    let connected = false // won't render
//useEffect runs all the time, and will continue to listen until web3 enabled changes
    useEffect(() => {
        //web3enabled starts off as false, and the browser then checks the local storage
        //and the browser says web3  should be enabled, let's turn to true 
        if (isWeb3Enabled) return
        if (typeof window !== "undefined"){
            if (window.localStorage.getItem("connected", "injected")){ //after refreshing:this means we stay connected to the page when we refresh/locally we stored the connected state
                                                        //b/c web 3 enabled 
                enableWeb3()
            }
        }
        enableWeb3()
        console.log("Hi !")
        console.log(isWeb3Enabled)

    },[isWeb3Enabled]) //no depencdecy array:  run anytime smometinh rerenders 
    //careful with this b/c you will get circular renders 
    //if we give it no dep array,  it is going to run anytime anything in this prohect rendrs,
    //if its blank, it will run once
    //if there is a dep array, it will run anytime  something in this array changes 
    //some value changed, i am going to re render the page 

// we want out front end to re render when we connect
//some button that connects us  and changes connected  to be true
//blank depencyt  array, run once load


//rerender to see whether an account has changed 

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account changed to ${account}`)
            if (account ==null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("null account  found")

            }

        })

    }, [])


    return( 
        <div>

            {account ? (
                <div>
                    Connected to {account.slice(0,6)}...{account.slice(account.length - 4)} 
                </div>
                
            ) : ( 
                <button 
                    onClick={async () => {
                        await enableWeb3() 
                        if (typeof window != "undefined")

                            window.localStorage.setItem("connected", "injected")
                    }}
                    disabled ={isWeb3EnableLoading} //disabled if we are loading 
                >
                    Connect
                </button>
            )}
        </div>
    )
}