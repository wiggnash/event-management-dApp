import React,{useContext} from "react";
import { EventContext } from "../context/EventContext";

const Transactions = () => {

    return (
        <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
            <div className="flex flex-col md:p-12 py-12 px-4">
                <h3 className="text-white text-3xl text-center my-2">
                    See who is participating
                </h3>
            </div>
        </div>
    );
}

export default Transactions;