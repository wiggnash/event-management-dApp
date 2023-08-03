import React,{ createContext, useEffect , useState } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../utils/constants';

export const EventContext = createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const eventContract = new ethers.Contract(contractABI,contractABI,signer);
    console.log({
        provider,
        signer,
        eventContract
    });
}


export const EventProvider = ({ children }) => {
    const checkIfWalletIsConnected = async() => {
        if(!ethereum) return alert("Please install metamask");
        const accounts = await ethereum.request({method:"eth_accounts"});
        console.log(accounts);
    }

    return(
        <EventContext.Provider value = {{}}>
            {children}
        </EventContext.Provider>
    )
}