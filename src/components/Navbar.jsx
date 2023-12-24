import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchInput } from "../store/searchSlice";
import { setSelectedType } from "../store/typeSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const searchInput = useSelector((state) => state.search.searchInput);
  const selectedType = useSelector((state) => state.type.selectedType);

  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [type, setType] = useState(["Type"]);

  const fetchPokemonType = async () => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/type`);
      const data = await res.json();
      const typeNames = data.results.map((type) => type.name);
      setType(["Type", ...typeNames]);
    } catch (error) {
      console.error("Error fetching Pokemon type:", error);
    }
  };

  useEffect(() => {
    fetchPokemonType();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [dropdownRef]);

  return (
    <nav className="bg-white border-gray-200">
      <div className="w-full flex flex-wrap items-center justify-between mx-auto p-4">
        <span className="self-center text-2xl font-semibold whitespace-nowraP">
          Pokedex
        </span>
        <div className="flex gap-4 mt-4 md:mt-0">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search icon</span>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => dispatch(setSearchInput(e.target.value))}
            />
          </div>
          <div className="flex relative" ref={dropdownRef}>
            <button
              className="flex items-center justify-between gap-10 p-1 px-2 border border-gray-300 bg-gray-50 rounded-lg"
              onClick={() => setDropdown(!dropdown)}
            >
              <h3
                className={`text-sm ${
                  selectedType === "Type" && "text-gray-400"
                }`}
              >
                {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
              </h3>
              <svg
                className="w-2 h-2 ms-2.5 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {dropdown && (
              <ul className="w-full space-y-2 py-2 absolute top-8 text-sm z-10 border border-gray-300 bg-gray-50 rounded-lg rounded-t-none border-t-0 z-1 h-36 overflow-scroll overflow-x-hidden">
                {type.map((typeName) => (
                  <li
                    className="px-2 py-1 hover:bg-gray-100 rounded-lg cursor-pointer"
                    key={typeName}
                    onClick={() => {
                      dispatch(setSelectedType(typeName));
                      setDropdown(false);
                    }}
                  >
                    {typeName.charAt(0).toUpperCase() + typeName.slice(1)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
