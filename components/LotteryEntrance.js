
// have a function to enter the lottery 

import {useWeb3Contract} from "react-moralis"
import {abi, contractAddresses} from "../constants" //we specifiy them in one line b/c we have one file, index file
import {useMoralis} from "react-moralis"
import { useEffect, useState } from "react"
import {ethers} from "ethers"
import { useNotification } from "web3uikit" //gives us a dispatch


//the header actually passes up all the info about metamask to the Moralis providder
//and then the morales provider passes it down to all the components inside those
//inside those Morales provided tags
//chain id gives us the hex additon of the chain id
export default  function LotteryEntrance() {
    const{chainId: chainIdHex, isWeb3Enabled} = useMoralis() //pull out the chain id
    //console.log(parseInt(chainIdHex))// we aren't going to be changing the raffle address
    const chainId = parseInt(chainIdHex) //we are creating a new variable 
    const raffleAddress = chainId in contractAddresses ?  contractAddresses[chainId][0] : null 
    const [entranceFee, setEntranceFee] = useState("0") //giving the entrance fee its staring value
    
    const [numPlayers, setNumPlayers] = useState("0") //giving the entrance fee its staring value
    const [recentWinner, setRecentWinner] = useState("0") //giving the entrance fee its staring value



    const dispatch = useNotification()   //this is like a little pop up we get 


    const {runContractFunction: enterRaffle, isLoading, isFetching} = useWeb3Contract({

        abi: abi,
        contractAddress: raffleAddress , //speciify the network id 
        functionName: "enterRaffle",
        params: {},
        msgValue:  entranceFee,

    })





    const {runContractFunction: getEntranceFee} = useWeb3Contract({

        abi: abi,
        contractAddress: raffleAddress , //speciify the network id 
        functionName: "getEntranceFee",
        params: {},
    })

//for each function we call, we need the abi, contract adddress and function name

    const {runContractFunction: getNumberOfPlayers} = useWeb3Contract({

        abi: abi,
        contractAddress: raffleAddress , //speciify the network id 
        functionName: "getNumberOfPlayers",
        params: {},
    })


    const {runContractFunction: getRecentWinner} = useWeb3Contract({

        abi: abi,
        contractAddress: raffleAddress , //speciify the network id 
        functionName: "getRecentWinner",
        params: {},
    })

    async function updateUI() {
        const entranceFeeFromCall = (await getEntranceFee()).toString()
        const numPlayersfromCall = (await getNumberOfPlayers()).toString()
        const recentWinnerFromCall = await getRecentWinner()
        setEntranceFee(entranceFeeFromCall) // we set the use state that triggers a rerender
        setNumPlayers(numPlayersfromCall)
        setRecentWinner(recentWinnerFromCall)

    }





// we want the page to automatically re render whenever we add a new person to the raffle

    useEffect(() => {
        if (isWeb3Enabled) {
            //try to read the raffle entrance fee
            
            updateUI()





        }

    }, [isWeb3Enabled])

    //this function automatically re renders the page wheenver we enter someone into the rafffle
    const handleSuccess = async function (tx){

        await tx.wait(1) // this waits for the transaction to be conrimfed 
        handleNewNotification(tx)
        updateUI()


    }




    const handleNewNotification = function() {
        dispatch({

            type: "info",
            message: "Transaction Complete",
            title: "Tx Notification" ,
            position: "topR",
            icon: "bell" ,





        })
    }
    //tailwinds allow us to set class names for our divs
//on success is checking whether the transaction has actually been sent successfully to metamask

    return(
        <div className="p-5">
            Hi From lottery entrance !
            {raffleAddress ?  ( 
                <div className=""> 
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                        onClick = {async function(){
                            await enterRaffle({
                                onSuccess: handleSuccess,
                                onError: (error) => console.log(error),



                            })

                    
                    
                        }}
                        disabled = {isLoading || isFetching}
                        
                        
                        
                    >
                        {isLoading || isFetching ? ( 
                            <div className="animate-spin spinner-border h-8 w8 border-b-2 rounded full"></div>
                        )  : ( 
                            <div>Enter Raffle </div> 
                        )}                            
                            
                            
                        
                        
                    </button>
                    <div>EntranceFee: {ethers.utils.formatUnits(entranceFee, "ether")} ETH </div>
                    <div>Players: {numPlayers}</div>
                    <div>Recent Winner: {recentWinner}</div>


                    
                    
                    
                    
                    
                    
                    
                </div> 
            ) : (
                

                <div> No Raffle Address detected</div>
            
            
            )}


        
        
        </div>
    )
}


    