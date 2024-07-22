// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropertyCard from "../../components/PropertyCard";
import { useLocation } from "react-router-dom";
import BudgetSlider from "./BudgetSlider";

function SearchPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const bhk = params.get("bhk");

  const [searchFilters, setSearchFilters] = useState({
    searchTerm: "",
    propertyType: "all",
    transactionType: "all",
    parking: false,
    furnished: false,
    sort: "createdAt",
    order: "desc",
    powerBackup: false,
    lift: false,
    security: false,
    waterSupply: false,
    gymnasium: false,
    swimmingPool: false,
    clubhouse: false,
    garden: false,
    cctvSecurity: false,
    minPrice: 0,
    maxPrice: 1000000000,
  });

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromCurrentUrl = urlParams.get("searchTerm");
    const propertyTypeFromCurrentUrl = urlParams.get("propertyType");
    const transactionTypeFromCurrentUrl = urlParams.get("transactionType");
    const parkingFromCurrentUrl = urlParams.get("parking");
    const furnishedFromCurrentUrl = urlParams.get("furnished");
    const sortFromCurrentUrl = urlParams.get("sort");
    const orderFromCurrentUrl = urlParams.get("order");
    const powerBackupFromCurrentUrl = urlParams.get("powerBackup");
    const liftFromCurrentUrl = urlParams.get("lift");
    const securityFromCurrentUrl = urlParams.get("security");
    const waterSupplyFromCurrentUrl = urlParams.get("waterSupply");
    const gymnasiumFromCurrentUrl = urlParams.get("gymnasium");
    const swimmingPoolFromCurrentUrl = urlParams.get("swimmingPool");
    const clubhouseFromCurrentUrl = urlParams.get("clubhouse");
    const gardenFromCurrentUrl = urlParams.get("garden");
    const cctvSecurityFromCurrentUrl = urlParams.get("cctvSecurity");

    if (
      searchTermFromCurrentUrl ||
      propertyTypeFromCurrentUrl ||
      transactionTypeFromCurrentUrl ||
      parkingFromCurrentUrl ||
      furnishedFromCurrentUrl ||
      sortFromCurrentUrl ||
      orderFromCurrentUrl ||
      powerBackupFromCurrentUrl ||
      liftFromCurrentUrl ||
      securityFromCurrentUrl ||
      waterSupplyFromCurrentUrl ||
      gymnasiumFromCurrentUrl ||
      swimmingPoolFromCurrentUrl ||
      clubhouseFromCurrentUrl ||
      gardenFromCurrentUrl ||
      cctvSecurityFromCurrentUrl
    ) {
      setSearchFilters({
        searchTerm: searchTermFromCurrentUrl || "",
        propertyType: propertyTypeFromCurrentUrl || "all",
        transactionType: transactionTypeFromCurrentUrl || "all",
        parking: parkingFromCurrentUrl === "true",
        furnished: furnishedFromCurrentUrl === "true",
        sort: sortFromCurrentUrl || "createdAt",
        order: orderFromCurrentUrl || "desc",
        powerBackup: powerBackupFromCurrentUrl === "true",
        lift: liftFromCurrentUrl === "true",
        security: securityFromCurrentUrl === "true",
        waterSupply: waterSupplyFromCurrentUrl === "true",
        gymnasium: gymnasiumFromCurrentUrl === "true",
        swimmingPool: swimmingPoolFromCurrentUrl === "true",
        clubhouse: clubhouseFromCurrentUrl === "true",
        garden: gardenFromCurrentUrl === "true",
        cctvSecurity: cctvSecurityFromCurrentUrl === "true",
      });
    }

    const fetchResults = async () => {
      try {
        setLoading(true);

        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/propertyListing/get?${searchQuery}`);
        const data = await res.json();

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
  }, [location.search]);

  const handlingChangesInInput = (e) => {
    const { id, value, type, checked } = e.target;
    let newValue;

    if (type === "checkbox") {
      newValue = checked;
    } else if (type === "radio") {
      newValue = id;
    } else {
      newValue = value;
    }

    setSearchFilters((prevFilters) => ({
      ...prevFilters,
      [id]: newValue,
      ...(type === "radio" && { [e.target.name]: id }),
    }));
    // i forgot to do this
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";

      const order = e.target.value.split("_")[1] || "desc";

      setSearchFilters({ ...searchFilters, sort, order });
    }
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    Object.keys(searchFilters).forEach((key) => {
      urlParams.set(key, searchFilters[key]);
    });

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const filteredAmenities = [
    { label: "Power Backup", value: "powerBackup" },
    { label: "High speed Elevators", value: "lift" },
    { label: "24x7 Security", value: "security" },
    { label: "Water Supply", value: "waterSupply" },
    { label: "CCTV Camera Security", value: "cctvSecurity" },
    ...(searchFilters.propertyType !== "commercial"
      ? [
          { label: "Gymnasium", value: "gymnasium" },
          { label: "Swimming Pool", value: "swimmingPool" },
          { label: "Clubhouse", value: "clubhouse" },
          { label: "Children's play Area", value: "garden" },
        ]
      : []),
  ];

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
              placeholder="Search by location, title, or description"
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
              {searchFilters.propertyType !== "rawLand" && (
                <>
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
                </>
              )}
            </div>
          </div>
          {searchFilters.propertyType !== "rawLand" && (
            <div className="flex flex-col gap-4">
              <label className="font-semibold text-gray-300">
                Amenities Provided:
              </label>
              <div className="flex flex-wrap gap-4">
                {filteredAmenities.map((amenity) => (
                  <label
                    key={amenity.value}
                    className="flex items-center gap-2 text-gray-300"
                  >
                    <input
                      type="checkbox"
                      id={amenity.value}
                      className="w-5 h-5"
                      onChange={handlingChangesInInput}
                      checked={searchFilters[amenity.value]}
                    />
                    <span>{amenity.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
          <BudgetSlider
            searchFilters={searchFilters}
            setSearchFilters={setSearchFilters}
          />
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
          {bhk ? `Search Results for ${bhk} BHK` : ""}
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
