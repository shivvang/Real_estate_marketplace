// eslint-disable-next-line no-unused-vars
import React, { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import { Link } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import BhkChoice from "../components/BhkChoice";
import BudgetChoice from "../components/BudgetChoice ";
import PropertiesPostedBy from "../components/PropertiesPostedBy ";
import Loading from "../components/Loading";

SwiperCore.use([Navigation]);
function Home() {
  const [sellProperty, setSellProperty] = useState([]);
  const [rentalProperty, setRentalProperty] = useState([]);
  const [pgProperty, setPgProperty] = useState([]);
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProperties = useCallback(async (type, setter) => {
    try {
      const res = await fetch(
        `/api/propertyListing/get?transactionType=${type}&limit=5`
      );
      const data = await res.json();
      if (data) setter(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchFeaturedProperties = useCallback(async () => {
    try {
      const res = await fetch("/api/propertyListing/get?limit=5");
      const data = await res.json();
      if (data) setFeaturedProperties(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const fetchAllProperties = async () => {
      setIsLoading(true);
      await fetchProperties("sell", setSellProperty);
      await fetchProperties("rent", setRentalProperty);
      await fetchProperties("pg", setPgProperty);
      await fetchFeaturedProperties();
      setIsLoading(false);
    };

    fetchAllProperties();
  }, [fetchProperties, fetchFeaturedProperties]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-gray-200 font-bold text-3xl lg:text-6xl">
          If Homes Had Personalities, <br /> We&apos;d Be The{" "}
          <span className="text-blue-500">Matchmakers</span>
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Some people look for beautiful places, <br />
          others make beautiful places.
        </div>
      </div>

      {/* Carousel for Featured Properties */}
      <div className="max-w-6xl mx-auto p-3 mb-10">
        <Swiper navigation>
          {featuredProperties.length > 0 &&
            featuredProperties.map((property) => (
              <SwiperSlide key={property._id}>
                <div
                  style={{
                    background: `url(${property.propertyImageUrls[0]}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                  className="h-[550px] rounded-lg"
                ></div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      <BudgetChoice />
      {/* Section for Sale Properties */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {sellProperty.length > 0 && (
          <div>
            <div className="my-3 flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-200">
                Recent Sale Properties
              </h2>
              <Link
                className="text-sm text-blue-500"
                to={`/search?transactionType=sell`}
              >
                Show More of These
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {sellProperty.map((property) => (
                <PropertyCard key={property._id} propertyData={property} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Section for Rental Properties */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {rentalProperty.length > 0 && (
          <div>
            <div className="my-3 flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-200">
                Recent Rental Properties
              </h2>
              <Link
                className="text-sm text-blue-500"
                to={`/search?transactionType=rent`}
              >
                Show More of These
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentalProperty.map((property) => (
                <PropertyCard key={property._id} propertyData={property} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Section for PG Properties */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {pgProperty.length > 0 && (
          <div>
            <div className="my-3 flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-200">
                Recent PG Properties
              </h2>
              <Link
                className="text-sm text-blue-500"
                to={`/search?transactionType=pg`}
              >
                Show More of These
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {pgProperty.map((property) => (
                <PropertyCard key={property._id} propertyData={property} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-8 p-6 bg-gray-900 rounded-lg shadow-lg">
        <BhkChoice />
        <PropertiesPostedBy />
      </div>
    </div>
  );
}

export default Home;
