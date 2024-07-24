// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PropertyList() {
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  const [userProperties, setUserProperties] = useState([]);

  useEffect(() => {
    const fetchUserProperty = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/users/postedProperty/${currentUser._id}`);
        if (!res.ok) throw new Error("Failed to fetch properties");
        const data = await res.json();
        setUserProperties(data);
      } catch (error) {
        toast.error("Error occurred while fetching user-created property.");
      } finally {
        setLoading(false);
      }
    };

    if (currentUser && currentUser._id) {
      fetchUserProperty();
    }
  }, [currentUser]);

  const handlePropertyDeletion = async (propertyID) => {
    try {
      const res = await fetch(`/api/propertyListing/delete/${propertyID}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || data.success === false) {
        throw new Error(data.message || "Failed to delete property");
      }
      setUserProperties((prev) =>
        prev.filter((property) => property._id !== propertyID)
      );
      toast.success("Property deleted successfully.");
    } catch (error) {
      toast.error("Error occurred while deleting the property.");
    }
  };

  return (
    <div className="p-5 max-w-7xl mx-auto mt-10 bg-gray-800 rounded-lg shadow-md">
      <ToastContainer />
      <h1 className="text-3xl font-semibold text-center mb-8 text-blue-500">
        Your Properties Ads
      </h1>

      {loading ? (
        <div className="text-center text-blue-500">Loading...</div>
      ) : (
        <>
          {userProperties.length > 0 ? (
            userProperties.map((property) => (
              <div
                key={property._id}
                className="border border-gray-700 p-5 rounded-lg mb-6 bg-gray-900 shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <Link
                  to={`/propertyView/${property._id}`}
                  className="block w-full h-full"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="flex items-center gap-4">
                      {property.propertyImageUrls &&
                        property.propertyImageUrls
                          .slice(0, 3)
                          .map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Property ${property.name}`}
                              className="h-24 w-24 object-cover rounded-md border border-gray-700"
                            />
                          ))}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-blue-400 font-semibold text-lg hover:underline truncate">
                        {property.name}
                      </h2>
                      <p className="text-gray-400 mt-2 line-clamp-3">
                        {property.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-start md:items-center mt-4 md:mt-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handlePropertyDeletion(property._id);
                        }}
                        className="text-red-500 uppercase hover:underline mb-2"
                      >
                        Delete
                      </button>
                      <Link
                        to={`/updateproperty/${property._id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-green-500 uppercase hover:underline"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No properties found.</p>
          )}
        </>
      )}
    </div>
  );
}

export default PropertyList;
