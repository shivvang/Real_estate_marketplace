import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";

function SearchPage() {
  const navigate = useNavigate();
  const [searchFilters, setSearchFilters] = useState({
    searchTerm: "",
    propertyType: "all",
    Parking: false,
    furnished: false,
    sort: "createdAt",
    order: "desc",
  });

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromCurrentUrl = urlParams.get("searchTerm");
    const propertyTypeFromCurrentUrl = urlParams.get("propertyType");
    const parkingFromCurrentUrl = urlParams.get("Parking");
    const furnishedFromCurrentUrl = urlParams.get("furnished");
    const sortFromCurrentUrl = urlParams.get("sort");
    const orderFromCurrentUrl = urlParams.get("order");

    if (
      searchTermFromCurrentUrl ||
      propertyTypeFromCurrentUrl ||
      parkingFromCurrentUrl ||
      furnishedFromCurrentUrl ||
      sortFromCurrentUrl ||
      orderFromCurrentUrl
    ) {
      setSearchFilters({
        searchTerm: searchTermFromCurrentUrl || "",
        propertyType: propertyTypeFromCurrentUrl || "all",
        Parking: parkingFromCurrentUrl === "true" ? true : false,
        furnished: furnishedFromCurrentUrl === "true" ? true : false,
        sort: sortFromCurrentUrl || "createdAt",
        order: orderFromCurrentUrl || "desc",
      });
    }

    const fetchResults = async () => {
      try {
        setLoading(true);
        setShowMore(false);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/propertyListing/get?${searchQuery}`);
        const data = await res.json();
        if (data.length > 8) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
        if (!data) {
          console.log("some error has occurred");
          setLoading(false);
        }
        setSearchResults(data);
        setLoading(false);
      } catch (error) {
        console.log("error while fetching properties from data", error);
        setLoading(false);
      }
    };
    fetchResults();
  }, [window.location.search]);

  const handlingChangesInInput = (e) => {
    const { id, value, checked } = e.target;

    // Handle property type checkboxes like radio buttons
    if (id === "all" || id === "rent" || id === "sale") {
      setSearchFilters({ ...searchFilters, propertyType: id });
    }

    // Handle other inputs
    if (id === "searchTerm") {
      setSearchFilters({ ...searchFilters, searchTerm: value });
    }

    if (id === "Parking" || id === "furnished") {
      setSearchFilters({ ...searchFilters, [id]: checked });
    }

    if (id === "sort_order") {
      const sort = value.split("_")[0] || "createdAt";
      const order = value.split("_")[1] || "desc";
      setSearchFilters({ ...searchFilters, sort, order });
    }
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", searchFilters.searchTerm);
    urlParams.set("propertyType", searchFilters.propertyType);
    urlParams.set("Parking", searchFilters.Parking);
    urlParams.set("furnished", searchFilters.furnished);
    urlParams.set("sort", searchFilters.sort);
    urlParams.set("order", searchFilters.order);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const NoOfestates = searchResults.length;
    const startIndex = NoOfestates;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/propertyListing/get?${searchQuery}`);
    const data = await res.json();

    setSearchResults(...searchResults, ...data);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen bg-gray-900 text-white w-full md:w-1/2 overflow-y-auto">
        <form onSubmit={handleFormSubmission} className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <label className="whitespace-nowrap font-semibold text-gray-300">
              Search Term:
            </label>
            <input
              type="text"
              placeholder="Search..."
              id="searchTerm"
              className="border rounded-lg p-3 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchFilters.searchTerm}
              onChange={handlingChangesInInput}
            />
          </div>
          <div className="flex flex-col gap-4">
            <label className="font-semibold text-gray-300">
              Property Type:
            </label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-gray-300">
                <input
                  type="radio"
                  id="residential"
                  name="propertyType"
                  className="w-5 h-5"
                  onChange={handlingChangesInInput}
                  checked={searchFilters.propertyType === "residential"}
                />
                <span>Residential</span>
              </label>
              <label className="flex items-center gap-2 text-gray-300">
                <input
                  type="radio"
                  id="commercial"
                  name="propertyType"
                  className="w-5 h-5"
                  onChange={handlingChangesInInput}
                  checked={searchFilters.propertyType === "commercial"}
                />
                <span>Commercial</span>
              </label>
              <label className="flex items-center gap-2 text-gray-300">
                <input
                  type="radio"
                  id="rawLand"
                  name="propertyType"
                  className="w-5 h-5"
                  onChange={handlingChangesInInput}
                  checked={searchFilters.propertyType === "rawLand"}
                />
                <span>Raw Land</span>
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <label className="font-semibold text-gray-300">
              Transaction Type:
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-gray-300">
                <input
                  type="radio"
                  id="sell"
                  name="transactionType"
                  className="w-5 h-5"
                  onChange={handlingChangesInInput}
                  checked={searchFilters.transactionType === "sell"}
                />
                <span>Sell</span>
              </label>
              <label className="flex items-center gap-2 text-gray-300">
                <input
                  type="radio"
                  id="rent"
                  name="transactionType"
                  className="w-5 h-5"
                  onChange={handlingChangesInInput}
                  checked={searchFilters.transactionType === "rent"}
                />
                <span>Rent</span>
              </label>
              <label className="flex items-center gap-2 text-gray-300">
                <input
                  type="radio"
                  id="pg"
                  name="transactionType"
                  className="w-5 h-5"
                  onChange={handlingChangesInInput}
                  checked={searchFilters.transactionType === "pg"}
                />
                <span>PG</span>
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <label className="font-semibold text-gray-300">
              Amenities Provided:
            </label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-gray-300">
                <input
                  type="checkbox"
                  id="powerBackup"
                  className="w-5 h-5"
                  onChange={handlingChangesInInput}
                  checked={searchFilters.powerBackup}
                />
                <span>Power Backup</span>
              </label>
              <label className="flex items-center gap-2 text-gray-300">
                <input
                  type="checkbox"
                  id="lift"
                  className="w-5 h-5"
                  onChange={handlingChangesInInput}
                  checked={searchFilters.lift}
                />
                <span>Lift</span>
              </label>
              <label className="flex items-center gap-2 text-gray-300">
                <input
                  type="checkbox"
                  id="security"
                  className="w-5 h-5"
                  onChange={handlingChangesInInput}
                  checked={searchFilters.security}
                />
                <span>Security</span>
              </label>
              <label className="flex items-center gap-2 text-gray-300">
                <input
                  type="checkbox"
                  id="waterSupply"
                  className="w-5 h-5"
                  onChange={handlingChangesInInput}
                  checked={searchFilters.waterSupply}
                />
                <span>Water Supply</span>
              </label>
              <label className="flex items-center gap-2 text-gray-300">
                <input
                  type="checkbox"
                  id="gymnasium"
                  className="w-5 h-5"
                  onChange={handlingChangesInInput}
                  checked={searchFilters.gymnasium}
                />
                <span>Gymnasium</span>
              </label>
              <label className="flex items-center gap-2 text-gray-300">
                <input
                  type="checkbox"
                  id="swimmingPool"
                  className="w-5 h-5"
                  onChange={handlingChangesInInput}
                  checked={searchFilters.swimmingPool}
                />
                <span>Swimming Pool</span>
              </label>
              <label className="flex items-center gap-2 text-gray-300">
                <input
                  type="checkbox"
                  id="clubhouse"
                  className="w-5 h-5"
                  onChange={handlingChangesInInput}
                  checked={searchFilters.clubhouse}
                />
                <span>Clubhouse</span>
              </label>
              <label className="flex items-center gap-2 text-gray-300">
                <input
                  type="checkbox"
                  id="garden"
                  className="w-5 h-5"
                  onChange={handlingChangesInInput}
                  checked={searchFilters.garden}
                />
                <span>Garden</span>
              </label>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold text-gray-300">Sort</label>
            <select
              onChange={handlingChangesInInput}
              defaultValue={"createdAt_desc"}
              id="sort_order"
              className="border rounded-lg p-3 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="priceBreakUp_desc">Price High to Low</option>
              <option value="priceBreakUp_asc">Price Low to High</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-blue-600 text-white p-3 rounded-lg uppercase hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1 overflow-y-auto">
        <h1 className="text-3xl font-semibold p-3 text-gray-800 mt-5">
          Results...
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && searchResults.length === 0 && (
            <p className="text-xl text-gray-800">No Data to Display here</p>
          )}
          {loading && (
            <p className="text-xl text-gray-800 text-center w-full">
              Loading ....
            </p>
          )}
          {!loading &&
            searchResults &&
            searchResults.map((propertyData) => (
              <PropertyCard
                key={propertyData._id}
                propertyData={propertyData}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
