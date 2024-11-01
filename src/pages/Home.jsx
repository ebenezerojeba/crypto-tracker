import React, { useContext, useState, useEffect } from "react";
import { CoinContext } from "../context/CoinContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const inputHandler = (e) => {
    setInput(e.target.value);
    // if (e.target.value) {
    //   setDisplayCoin(Array.isArray(allCoin) ? allCoin : []);
    // }
  };

  const searchHandler = async (e) => {
    e.preventDefault();
    // if (!Array.isArray(allCoin)) return;

    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(coins);
  };

  useEffect(() => {
    setIsLoading(true);

    setDisplayCoin(allCoin);
    setError(null);

    setIsLoading(false);
  }, [allCoin]);

  if (isLoading) {
    return (
      <div className="grid place-items-center min-h-[50vh]">
        <div className="w-16 h-16 border-4 border-t-[#7927ff] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid place-items-center min-h-[50vh]">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 lg:py-20 py-8 pb-10">
      <div className="max-w-xl mx-auto flex flex-col items-center text-center gap-5 text-xl">
        <div className="space-y-2">
          <h2 className="text-sm md:text-base text-[#7927ff] font-semibold uppercase tracking-wider">
            Real-Time Crypto Tracking
          </h2>
          <h1 className="text-2xl md:text-4xl font-bold leading-tight">
            Discover & Track <br />
            <span className="bg-gradient-to-r from-[#7927ff] to-blue-500 bg-clip-text text-transparent">
              Digital Assets
            </span>
          </h1>
        </div>
        <p className="max-w-lg text-base md:text-lg text-[#e3e3e3] leading-relaxed">
          Stay ahead of the market with real-time cryptocurrency data, advanced
          analytics, and comprehensive market insights.
        </p>

        <form
          className="w-full max-w-md flex  flex-col gap-3 md:gap-0 md:flex-row items-stretch md:items-center bg-white rounded-2xl p-2 md:p-1"
          onSubmit={searchHandler}
        >
          <input
            className="flex-1 text-black text-base md:text-lg font-normal outline-none border-none px-3 py-2 md:py-1 bg-transparent"
            type="text"
            onChange={inputHandler}
            required
            list="coinlist"
            value={input}
            placeholder="Search cryptocurrencies..."
          />

          <datalist id="coinlist">
            {Array.isArray(allCoin) &&
              allCoin.map((item, index) => (
                <option key={index} value={item.name} />
              ))}
          </datalist>

          <button
            className="w-full md:w-auto border-none bg-[#7927ff] text-white text-base px-6 py-3 md:py-2 cursor-pointer rounded-xl hover:bg-[#6317df] transition-colors"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>

      <div className="max-w-7xl mx-auto bg-gray-900 rounded-lg overflow-x-auto -mb-10">
        <div className="min-w-[320px]">
          {/* Table Header */}
          <div className="grid grid-cols-4 md:grid-cols-5 px-4 md:px-8 py-4 items-center border-b-2">
            <p className="text-sm md:text-base w-[10%]">#</p>
            <p className="text-sm md:text-base w-[40%] md:w-[30%]">Coins</p>
            <p className="text-sm md:text-base w-[25%] md:w-[20%]">Price</p>
            <p className="text-sm md:text-base w-[25%] md:w-[20%] text-center">
              24h
            </p>
            <p className="hidden md:block text-sm md:text-base w-[20%] text-end">
              Market Cap
            </p>
          </div>

          {/* Table Body */}
          {Array.isArray(displayCoin) &&
            displayCoin.slice(0, 10).map((item, index) => (
              <Link
                to={`/coin/${item.id}`}
                key={item.id || index}
                className="grid grid-cols-4 md:grid-cols-5 px-4 md:px-8 py-4 items-center last:border-0 border-b-2 hover:bg-gray-800/50"
              >
                <p className="text-sm md:text-base w-[15%]">
                  {item.market_cap_rank}
                </p>
                <div className="flex -ml-9 gap-2 md:gap-3 items-center w-[40%] md:w-[30%]">
                  <img
                    className="w-6 md:w-8"
                    src={item.image}
                    alt={item.name}
                  />
                  <p className="text-sm md:text-base">{item.name}</p>
                </div>
                <p className="text-xs md:text-sm w-[25%] md:w-[10%]">
                  {currency.symbol} {item.current_price?.toLocaleString()}
                </p>
                <p
                  className={`text-sm md:text-base w-[25%] md:w-[20%] text-center ${
                    item.price_change_percentage_24h > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {Math.floor(item.price_change_percentage_24h * 100) / 100}%
                </p>
                <p className="hidden md:block text-sm md:text-base w-[20%] text-end">
                  {currency.symbol} {item.market_cap?.toLocaleString()}
                </p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
