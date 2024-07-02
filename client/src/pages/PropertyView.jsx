import React, { useEffect, useState } from "react";
import { Form, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import Swipercore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

function PropertyView() {
  Swipercore.use([Navigation]);
  const [propertyData, setPropertydata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `/api/propertyListing/getProperty/${params.propertyId}`
        );
        const data = await res.json();
        if (data.success === false) {
          setLoading(false);
          setError(true);
          return;
        }
        setPropertydata(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchData();
  }, [params.propertyId]);
  console.log(propertyData);
  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">
          Somethings just dont work out bro
        </p>
      )}
      {propertyData && !loading && !error && (
        <div>
          <Swiper navigation>
            {propertyData.propertyImageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[300px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </main>
  );
}

export default PropertyView;
