// eslint-disable-next-line no-unused-vars
import React, { useEffect, useReducer } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PropertyCard from "../../components/PropertyCard";
import BudgetSlider from "./BudgetSlider";

const initialState = {
  searchFilters: {
    searchTerm: "",
    propertyType: "all",
    transactionType: "all",
    sort: "createdAt",
    order: "desc",
    furnished: false,
    balcony: false,
    parking: false,
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
  },
  searchResults: [],
  loading: false,
};

const actionTypes = {
  SET_SEARCH_FILTERS: "SET_SEARCH_FILTERS",
  SET_SEARCH_RESULTS: "SET_SEARCH_RESULTS",
  SET_LOADING: "SET_LOADING",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_SEARCH_FILTERS:
      return {
        ...state,
        searchFilters: {
          ...state.searchFilters,
          ...action.payload,
        },
      };
    case actionTypes.SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload,
      };
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

function SearchPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const storedFilters =
      JSON.parse(localStorage.getItem("searchFilters")) || {};

    const urlFilters = {
      searchTerm: urlParams.get("searchTerm") || storedFilters.searchTerm || "",
      propertyType:
        urlParams.get("propertyType") || storedFilters.propertyType || "all",
      transactionType:
        urlParams.get("transactionType") ||
        storedFilters.transactionType ||
        "all",
      balcony:
        urlParams.get("balcony") === "true" || storedFilters.balcony || false,
      parking:
        urlParams.get("parking") === "true" || storedFilters.parking || false,
      furnished:
        urlParams.get("furnished") === "true" ||
        storedFilters.furnished ||
        false,
      sort: urlParams.get("sort") || storedFilters.sort || "createdAt",
      order: urlParams.get("order") || storedFilters.order || "desc",
      powerBackup:
        urlParams.get("powerBackup") === "true" ||
        storedFilters.powerBackup ||
        false,
      lift: urlParams.get("lift") === "true" || storedFilters.lift || false,
      security:
        urlParams.get("security") === "true" || storedFilters.security || false,
      waterSupply:
        urlParams.get("waterSupply") === "true" ||
        storedFilters.waterSupply ||
        false,
      gymnasium:
        urlParams.get("gymnasium") === "true" ||
        storedFilters.gymnasium ||
        false,
      swimmingPool:
        urlParams.get("swimmingPool") === "true" ||
        storedFilters.swimmingPool ||
        false,
      clubhouse:
        urlParams.get("clubhouse") === "true" ||
        storedFilters.clubhouse ||
        false,
      garden:
        urlParams.get("garden") === "true" || storedFilters.garden || false,
      cctvSecurity:
        urlParams.get("cctvSecurity") === "true" ||
        storedFilters.cctvSecurity ||
        false,
      minPrice:
        parseInt(urlParams.get("minPrice"), 10) || storedFilters.minPrice || 0,
      maxPrice:
        parseInt(urlParams.get("maxPrice"), 10) ||
        storedFilters.maxPrice ||
        1000000000,
    };

    dispatch({
      type: actionTypes.SET_SEARCH_FILTERS,
      payload: urlFilters,
    });
  }, [location.search]);

  useEffect(() => {
    localStorage.setItem("searchFilters", JSON.stringify(state.searchFilters));
  }, [state.searchFilters]);

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

    dispatch({
      type: actionTypes.SET_SEARCH_FILTERS,
      payload: {
        [id]: newValue,
        ...(type === "radio" && { [e.target.name]: id }),
      },
    });

    if (id === "sort_order") {
      const [sort, order] = value.split("_");
      dispatch({
        type: actionTypes.SET_SEARCH_FILTERS,
        payload: { sort: sort || "createdAt", order: order || "desc" },
      });
    }
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    Object.keys(state.searchFilters).forEach((key) => {
      urlParams.set(key, state.searchFilters[key]);
    });

    navigate(`/search?${urlParams.toString()}`);
  };

  const filteredAmenities = [
    { label: "Power Backup", value: "powerBackup" },
    { label: "High speed Elevators", value: "lift" },
    { label: "24x7 Security", value: "security" },
    { label: "Water Supply", value: "waterSupply" },
    { label: "CCTV Camera Security", value: "cctvSecurity" },
    ...(state.searchFilters.propertyType !== "commercial"
      ? [
          { label: "Gymnasium", value: "gymnasium" },
          { label: "Swimming Pool", value: "swimmingPool" },
          { label: "Clubhouse", value: "clubhouse" },
          { label: "Children's play Area", value: "garden" },
        ]
      : []),
  ];

  const areaDetails = [
    { label: "Furnished", value: "furnished" },
    { label: "Balcony", value: "balcony" },
    { label: "Parking", value: "parking" },
  ].filter(
    (detail) =>
      !(
        detail.value === "balcony" &&
        state.searchFilters.propertyType === "commercial"
      )
  );

  useEffect(() => {
    // Fetch data whenever search filters change
    const fetchData = async () => {
      dispatch({ type: actionTypes.SET_LOADING, payload: true });

      const urlParams = new URLSearchParams(state.searchFilters);
      const response = await fetch(
        `/api/propertyListing/get?${urlParams.toString()}`
      );
      const data = await response.json();

      dispatch({ type: actionTypes.SET_SEARCH_RESULTS, payload: data });
      dispatch({ type: actionTypes.SET_LOADING, payload: false });
    };

    fetchData();
  }, [state.searchFilters]);
  console.log("exploration", JSON.parse(localStorage.getItem("searchFilters")));
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
              placeholder="Search by location, price  BHK or property type"
              id="searchTerm"
              className="border rounded-lg p-3 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={state.searchFilters.searchTerm}
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
                  id="all"
                  name="propertyType"
                  className="text-blue-600 focus:ring-2 focus:ring-blue-500"
                  checked={state.searchFilters.propertyType === "all"}
                  onChange={handlingChangesInInput}
                />
                All
              </label>
              <label className="flex items-center gap-2 text-gray-300">
                <input
                  type="radio"
                  id="residential"
                  name="propertyType"
                  className="text-blue-600 focus:ring-2 focus:ring-blue-500"
                  checked={state.searchFilters.propertyType === "residential"}
                  onChange={handlingChangesInInput}
                />
                Residential
              </label>
              <label className="flex items-center gap-2 text-gray-300">
                <input
                  type="radio"
                  id="commercial"
                  name="propertyType"
                  className="text-blue-600 focus:ring-2 focus:ring-blue-500"
                  checked={state.searchFilters.propertyType === "commercial"}
                  onChange={handlingChangesInInput}
                />
                Commercial
              </label>
              <label className="flex items-center gap-2 text-gray-300">
                <input
                  type="radio"
                  id="rawLand"
                  name="propertyType"
                  className="text-blue-600 focus:ring-2 focus:ring-blue-500"
                  checked={state.searchFilters.propertyType === "rawland"}
                  onChange={handlingChangesInInput}
                />
                Raw Land
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <label className="font-semibold text-gray-300">
              Transaction Type:
            </label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-gray-300">
                <input
                  type="radio"
                  id="all"
                  name="transactionType"
                  className="text-blue-600 focus:ring-2 focus:ring-blue-500"
                  checked={state.searchFilters.transactionType === "all"}
                  onChange={handlingChangesInInput}
                />
                All
              </label>
              <label className="flex items-center gap-2 text-gray-300">
                <input
                  type="radio"
                  id="sell"
                  name="transactionType"
                  className="text-blue-600 focus:ring-2 focus:ring-blue-500"
                  checked={state.searchFilters.transactionType === "sell"}
                  onChange={handlingChangesInInput}
                />
                Buy
              </label>
              <label className="flex items-center gap-2 text-gray-300">
                <input
                  type="radio"
                  id="rent"
                  name="transactionType"
                  className="text-blue-600 focus:ring-2 focus:ring-blue-500"
                  checked={state.searchFilters.transactionType === "rent"}
                  onChange={handlingChangesInInput}
                />
                Rent
              </label>
              <label className="flex items-center gap-2 text-gray-300">
                <input
                  type="radio"
                  id="pg"
                  name="transactionType"
                  className="text-blue-600 focus:ring-2 focus:ring-blue-500"
                  checked={state.searchFilters.transactionType === "pg"}
                  onChange={handlingChangesInInput}
                />
                PG
              </label>
            </div>
          </div>

          <BudgetSlider
            minPrice={state.searchFilters.minPrice}
            maxPrice={state.searchFilters.maxPrice}
            setSearchFilters={(min, max) =>
              dispatch({
                type: actionTypes.SET_SEARCH_FILTERS,
                payload: { minPrice: min, maxPrice: max },
              })
            }
          />

          {state.searchFilters.propertyType !== "rawLand" && (
            <>
              <label className="font-semibold text-gray-300">
                Area Details:
              </label>
              <div className="flex flex-wrap gap-4">
                {areaDetails.map((detail) => (
                  <label
                    key={detail.value}
                    className="flex items-center gap-2 text-gray-300"
                  >
                    <input
                      type="checkbox"
                      id={detail.value}
                      checked={state.searchFilters[detail.value]}
                      onChange={handlingChangesInInput}
                      className="text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                    {detail.label}
                  </label>
                ))}
              </div>

              <label className="font-semibold text-gray-300">
                Amenities Offered:
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
                      checked={state.searchFilters[amenity.value]}
                      onChange={handlingChangesInInput}
                      className="text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                    {amenity.label}
                  </label>
                ))}
              </div>
            </>
          )}

          <div className="flex flex-col gap-4">
            <label className="font-semibold text-gray-300">Sort By:</label>
            <select
              id="sort_order"
              className="border rounded-lg p-3 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={`${state.searchFilters.sort}_${state.searchFilters.order}`}
              onChange={handlingChangesInInput}
            >
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
              <option value="priceBreakUp_desc">Price High to Low</option>
              <option value="priceBreakUp_asc">Price Low to High</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
        </form>
      </div>

      <div className="p-7 md:min-h-screen w-full md:w-1/2 overflow-y-auto bg-gray-900 text-white">
        <h1 className="text-2xl mb-5">Search Results</h1>
        {state.loading ? (
          <div className="text-center">Loading...</div>
        ) : state.searchResults.length > 0 ? (
          state.searchResults.map((property) => (
            <div className="mb-4" key={property._id}>
              <PropertyCard propertyData={property} />
            </div>
          ))
        ) : (
          <div className="text-center">No results found</div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
