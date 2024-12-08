import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CoinContext } from "../context/CoinContext";
import LineChart from "../components/LineChart";

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-p6JHMcuFEjuxGqZrWcNNfTYd",
        },
      };

      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`,
        options
      );

      if (!response.ok) {
        throw new Error("Failed to fetch coin data");
      }

      const data = await response.json();
      setCoinData(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching coin data:", err);
    }
  };

  const fetchHistoricalData = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-p6JHMcuFEjuxGqZrWcNNfTYd",
        },
      };

      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
        options
      );

      if (!response.ok) {
        throw new Error("Failed to fetch historical data");
      }

      const data = await response.json();
      setHistoricalData(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching historical data:", err);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const fetchData = async () => {
      await Promise.all([fetchCoinData(), fetchHistoricalData()]);
      setIsLoading(false);
    };

    fetchData();
  }, [coinId, currency.name]); // Added proper dependencies

  if (isLoading) {
    return (
      <div className="grid place-items-center min-h-[80vh]">
        <div className="w-16 h-16 border-4 border-t-lime-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid place-items-center min-h-[80vh]">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  // Safe guard against missing data
  if (!coinData?.market_data || !historicalData) {
    return (
      <div className="grid place-items-center min-h-[80vh]">
        <p>No data available</p>
      </div>
    );
  }

  const {
    image,
    name,
    symbol,
    market_cap_rank,
    market_data: {
      current_price,
      market_cap,
      high_24h: high_24,
      low_24h: low_24,
    },
  } = coinData;

  return (
    <div className="px-4 md:px-20 py-8">
      <div className="flex flex-col items-center gap-4 mb-12">
        <img
          className="max-w-[100px] h-auto"
          src={image?.large}
          alt={`${name} logo`}
        />
        <p>
          <b className="text-lg font-medium">
            {name} ({symbol?.toUpperCase()})
          </b>
        </p>
      </div>

      {/* Coin Chart */}
      <div className="max-w-[600px] h-[250px] mx-auto mb-12">
        <LineChart historicalData={historicalData} />
      </div>

      {/* Coin Info */}
      <div className="max-w-[600px] mx-auto">
        <ul className="divide-y">
          <li className="flex justify-between py-4">
            <span>Crypto Market Rank</span>
            <span>{market_cap_rank}</span>
          </li>
          <li className="flex justify-between py-4">
            <span>Current Price</span>
            <span>
              {currency.symbol} {current_price[currency.name]?.toLocaleString()}
            </span>
          </li>
          <li className="flex justify-between py-4">
            <span>Market Cap</span>
            <span>
              {currency.symbol} {market_cap[currency.name]?.toLocaleString()}
            </span>
          </li>
          <li className="flex justify-between py-4">
            <span>24 hour high</span>
            <span>
              {currency.symbol} {high_24[currency.name]?.toLocaleString()}
            </span>
          </li>
          <li className="flex justify-between py-4">
            <span>24 hour low</span>
            <span>
              {currency.symbol} {low_24[currency.name]?.toLocaleString()}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Coin;
