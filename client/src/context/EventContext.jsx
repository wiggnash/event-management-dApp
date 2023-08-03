import React,{ createContext, useEffect , useState } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../utils/constants';

export const EventContext = createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = provider.getSigner();
    const eventContract = new ethers.Contract(contractAddress,contractABI,signer);
    return eventContract;
}


export const EventProvider = ({ children }) => {
    const [currentAccount,setcurrentAccount] = useState();
    const [info,setInfo] = useState({nameOfTheEvent:'',eventDescription:'',setLimitPeople:'',name:'',age:'',occupation:'',city:'',email:''});

    const handleChange = (e,name) => {
        setInfo((prevState) =>({...prevState,[name]:e.target.value}));
    }

    const checkIfWalletIsConnected = async() => {
        try {
            if(!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({method:"eth_accounts"});
            console.log(accounts);
        } catch(error){
            console.log(error);
        }
    }

    const connectWallet = async() => {
        try {
            if(!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({method:"eth_requestAccounts"});
            setCurrentAccount(accounts[0]);
        } catch(error){
            console.log(error);
        }
    }

    // sending name of the event , description and the total number of people 
    const sendInformation = async() => {
        try {
            if(!ethereum) return alert("Please install metamask");
            //get the data from the input given
            const {nameOfTheEvent,eventDescription,setLimitPeople,name,age,occupation,city,email} = info;
            const eventContract = getEthereumContract();
        } catch(error){
            console.log(error);
        }
    }


    useEffect(() => {
        checkIfWalletIsConnected();
    },[])

    return(
        <EventContext.Provider value = {{ connectWallet, currentAccount, info, sendInformation ,handleChange  }}>
            {children}
        </EventContext.Provider>
    )
}