import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchPage() {
  const navigate = useNavigate();
  const [searchFilters, setSearchFilters] = useState({
    searchTerm: "",
    propertyType: "all",
    Parking: false,
    furnished: false,
    sort: "created_at",
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
        sort: sortFromCurrentUrl || "created_at",
        order: orderFromCurrentUrl || "desc",
      });
    }

    const fetchResults = async () => {
      try {
        setLoading(true);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/propertyListing/get?${searchQuery}`);
        const data = await res.json();
        if (!data) {
          console.log("some shit has happened");
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

  console.log("search result", searchResults);
  const handlingChangesInInput = (e) => {
    if (
      (e.target.id === "all", e.target.id === "rent" || e.target.id === "sale")
    ) {
      setSearchFilters({ ...searchFilters, propertyType: e.target.id });
    }
    if (e.target.id === "searchTerm") {
      setSearchFilters({ ...searchFilters, searchTerm: e.target.value });
    }

    if (e.target.id === "Parking" || e.target.id === "furnished") {
      setSearchFilters({
        ...searchFilters,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "createdAt";
      const order = e.target.value.split("_")[1] || "desc";
      setSearchFilters({ ...searchFilters, sort, order });
    }
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", searchFilters.searchTerm);
    urlParams.set("propertyType", searchFilters.propertyType);
    urlParams.set("parking", searchFilters.Parking);
    urlParams.set("furnished", searchFilters.furnished);
    urlParams.set("sort", searchFilters.sort);
    urlParams.set("order", searchFilters.order);

    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleFormSubmission} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              search Term :-
            </label>
            <input
              type="text"
              placeholder="search..."
              id="searchTerm"
              className="border rounded-lg p-3 w-full"
              value={searchFilters.searchTerm}
              onChange={handlingChangesInInput}
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Property Type :-</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                className="w-5"
                onChange={handlingChangesInInput}
                checked={searchFilters.propertyType === "all"}
              />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handlingChangesInInput}
                checked={searchFilters.propertyType === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handlingChangesInInput}
                checked={searchFilters.propertyType === "sale"}
              />
              <span>Sale</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Amenities Provided :-</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="Parking"
                className="w-5"
                onChange={handlingChangesInInput}
                checked={searchFilters.Parking === true}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handlingChangesInInput}
                checked={searchFilters.furnished === true}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort</label>
            <select
              onChange={handlingChangesInInput}
              defaultValue={"created_at_desc"}
              id="sort_order"
              className="border rounded-lg p-3"
            >
              <option value="price_dsc">price high to low</option>
              <option value="price_asc">price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="">
        <h1 className="text-3xl font-semibold  p-3 text-slate-700 mt-5">
          results....
        </h1>
      </div>
    </div>
  );
}

export default SearchPage;
