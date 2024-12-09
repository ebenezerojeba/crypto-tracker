import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/coin.png";

import { Menu, X } from "lucide-react"; // make sure to import icons properly
import { CoinContext } from "../context/CoinContext";

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currencyHandler = (event) => {
    switch (event.target.value) {
      case "usd":
        setCurrency({ name: "usd", symbol: "$" });
        break;
      case "eur":
        setCurrency({ name: "eur", symbol: "€" });
        break;
      case "ngn":
        setCurrency({ name: "ngn", symbol: "₦" });
        break;
      default:
        setCurrency({ name: "usd", symbol: "$" });
        break;
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-900 text-gray-200 border-b border-gray-800">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between max-h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img className="w-24 sm:w-32 md:w-36" src={logo} alt="Logo" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-center">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <button className="hover:text-white">Features</button>
            <button className="hover:text-white">Pricing</button>
            <button className="hover:text-white">Blog</button>
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            <select
              onChange={currencyHandler}
              className="px-3 py-1 border rounded bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-white"
            >
              <option className="bg-gray-900" value="usd">
                USD
              </option>
              <option className="bg-gray-900" value="eur">
                EUR
              </option>
              <option className="bg-gray-900" value="ngn">
                NGR
              </option>
            </select>
            <button className="px-4 py-2 rounded-xl text-sm font-medium text-gray-900 bg-white hover:bg-gray-100 transition-colors">
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md hover:bg-gray-700"
            >
              Home
            </Link>
            <button className="block w-full text-left px-3 py-2 rounded-md hover:bg-gray-700">
              Features
            </button>
            <button className="block w-full text-left px-3 py-2 rounded-md hover:bg-gray-700">
              Pricing
            </button>
            <button className="block w-full text-left px-3 py-2 rounded-md hover:bg-gray-700">
              Blog
            </button>
            <div className="px-3 py-2">
              <select
                onChange={currencyHandler}
                className="w-full px-3 py-1 border rounded bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-white"
              >
                <option className="bg-gray-900" value="usd">
                  USD
                </option>
                <option className="bg-gray-900" value="eur">
                  EUR
                </option>
                <option className="bg-gray-900" value="ngn">
                  NGR
                </option>
              </select>
            </div>
            <div className="px-3 py-2">
              <button className="w-full px-4 py-2 rounded-xl text-sm font-medium text-gray-900 bg-white hover:bg-gray-100 transition-colors">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
