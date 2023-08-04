import React,{ createContext, useEffect , useState } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../utils/constants';

export const EventContext = createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress,contractABI,signer);
    return contract;
}


export const EventProvider = ({ children }) => {
    const [currentAccount,setCurrentAccount] = useState();
    const [eventName, setEventName] = useState("");
    const [description, setDescription] = useState("");
    const [limitPeopleInEvent, setLimitPeopleInEvent] = useState("");
    const [personList, setPersonList] = useState([]);
    // name, age, occupation, city, email
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [occupation, setOccupation] = useState("");
    const [city, setCity] = useState("");
    const [email, setEmail] = useState("");

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

    const sendNameOfTheEvent = async() => {
        try {
            if(!ethereum) return alert("Please install metamask");
            const contract = getEthereumContract();
            console.log(eventName);
            const tx = await contract.setEventName(eventName);
            await tx.wait();
        } catch(error){
            console.log(error);
        }
    }

    // setting the event description of people to the blockchain
    const sendEventDescription = async() => {
        try {
            if(!ethereum) return alert("Please install metamask");
            const contract = getEthereumContract();
            console.log(description);
            const tx = await contract.setEventName(description);
            await tx.wait();

        } catch(error){
            console.log(error);
        }
    }

    // setting the limit of people to the blockchain
    const sendLimit = async() => {
        try {
            if(!ethereum) return alert("Please install metamask");
            console.log(limitPeopleInEvent);
            const contract = getEthereumContract();
            const tx = await contract.setLimitPeople(limitPeopleInEvent);
            await tx.wait();
        } catch(error){
            console.log(error);
        }
    }
    
    // sending name of the event , description and the total number of people 
    const sendPersonDetails = async() => {
        try {
            if(!ethereum) return alert("Please install metamask");
            const contract = getEthereumContract();
            console.log(`${name} ${age} ${city} ${occupation} ${email}`);
            const tx = await contract.setPersonDetails(name,age,occupation,city,email);
            await tx.wait();
        } catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    },[])

    return(
        <EventContext.Provider value = {{ 
            connectWallet, 
            currentAccount,
            setName,
            setAge,
            setOccupation,
            setCity,
            setEmail,
            setEventName,
            setDescription,
            setLimitPeopleInEvent,
            setPersonList,
            sendNameOfTheEvent,
            sendEventDescription,
            sendLimit,
            sendPersonDetails,
            currentAccount
            }}>
            {children}
        </EventContext.Provider>
    )
}