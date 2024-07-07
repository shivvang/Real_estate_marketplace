import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Swipercore from "swiper";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
function Home() {
  const [saleProperty, setSaleProperty] = useState([]);
  const [rentalProperty, setRentalProperty] = useState([]);
  Swipercore.use([Navigation]);
  useEffect(() => {
    const fetchSaleProperty = async () => {
      try {
        const res = await fetch(
          `/api/propertyListing/get?propertyType=sale&limit=5`
        );
        const data = await res.json();
        console.log(data);
        if (data) setSaleProperty(data);
        fetchrentalProperty();
      } catch (error) {
        console.log(error);
      }
    };
    fetchSaleProperty();

    const fetchrentalProperty = async () => {
      try {
        const res = await fetch(
          `/api/propertyListing/get?propertyType=rent&limit=5`
        );

        const data = await res.json();

        if (data) setRentalProperty(data);
      } catch (error) {
        console.log(error);
      }
    };
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          If Homes Had Personalties <br /> We'd Be The{" "}
          <span className="text-slate-500">MatchMakers</span>
        </h1>
        <div className="text-gray-400 text-xs  sm:text-sm">
          Some People look for beautiful place <br />
          Others Make Beautiful place
        </div>
      </div>
      <Swiper navigation>
        {saleProperty &&
          saleProperty.length > 0 &&
          saleProperty.map((saleprop) => (
            <SwiperSlide key={saleprop._id}>
              <div
                style={{
                  background: `url(${saleprop.propertyImageUrls[0]}) center no-repeat `,
                  backgroundSize: "cover",
                }}
                className="h-[550px]"
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="max-w-8xl mxauot p-3 flex flex-col gap-8 my-10">
        {rentalProperty && rentalProperty.length > 0 && (
          <div className="">
            <div className="my-3">
              <div>
                <h2 className="text-2xl font-semibold text-slate-600">
                  Recent Sale Property Out There
                </h2>
              </div>
              <Link className="text-sm" to={`/search?propertyType=sale`}>
                Show More of These
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleProperty.map((saleprop) => (
                <PropertyCard key={saleprop._id} propertyData={saleprop} />
              ))}
            </div>
          </div>
        )}
        {rentalProperty && rentalProperty.length > 0 && (
          <div className="">
            <div className="my-3">
              <div>
                <h2 className="text-2xl font-semibold text-slate-600">
                  Recent Rental Property Out There
                </h2>
              </div>
              <Link className="text-sm" to={`/search?propertyType=rent`}>
                Show More of These
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentalProperty.map((rentProp) => (
                <PropertyCard key={rentProp._id} propertyData={rentProp} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
