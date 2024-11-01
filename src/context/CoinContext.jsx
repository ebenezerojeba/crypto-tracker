import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [allCoin, setAllCoin] = useState();
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$"
  })

  const fetchAllCoin = async (params) => {
    const options = {
        method: 'GET',
        headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-E6izKPch8wQdJ32bYPJ7Pu12'}
      };
      
      fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
        .then(response => response.json())
        .then(response => setAllCoin(response))
        .catch(err => console.error(err));
  }




  useEffect(()=>{
    fetchAllCoin();
  },[currency])

  const value ={
    allCoin, currency, setCurrency
  }
  return (
    <CoinContext.Provider value={value}>{props.children}</CoinContext.Provider>
  );
};

export default CoinContextProvider;
