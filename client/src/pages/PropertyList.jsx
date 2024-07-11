import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function PropertyList() {
  const [showUserPropertyError, setShowUserPropertyError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  const [showuserproperties, setShowuserproperties] = useState([]);

  useEffect(() => {
    const fetchUserProperty = async () => {
      setShowUserPropertyError(false);
      setLoading(true);
      try {
        const res = await fetch(`/api/users/postedProperty/${currentUser._id}`);
        const data = await res.json();
        if (!data) {
          setShowUserPropertyError(true);
          return;
        }
        setShowuserproperties(data);
      } catch (error) {
        setShowUserPropertyError(true);
      } finally {
        setLoading(false);
      }
    };
    if (currentUser && currentUser._id) {
      fetchUserProperty();
    }
  }, [currentUser]);

  const handlePropetyDeletion = async (propertyID) => {
    try {
      const res = await fetch(`/api/propertyListing/delete/${propertyID}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setShowuserproperties((prev) =>
        prev.filter((properties) => properties._id !== propertyID)
      );
    } catch (error) {
      console.log(error.name);
    }
  };
  return (
    <div className="p-5 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-6 text-primary">
        Your Properties
      </h1>

      {loading ? (
        <div className="text-center text-primary">Loading...</div>
      ) : (
        <>
          {showUserPropertyError && (
            <p className="text-red-600 text-center mb-4">
              Error occurred while fetching user created property.
            </p>
          )}

          {showuserproperties && showuserproperties.length > 0 ? (
            showuserproperties.map((property) => (
              <div
                key={property._id}
                className="border p-5 rounded-lg flex justify-between items-center gap-4 mb-4 bg-gray-900 shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <Link
                  to={`/propertyView/${property._id}`}
                  className="flex items-center gap-4"
                >
                  {property.propertyImageUrls &&
                    property.propertyImageUrls
                      .slice(0, 3)
                      .map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Property ${property.name}`}
                          className="h-20 w-20 object-cover rounded-md"
                        />
                      ))}
                </Link>
                <div className="flex-1">
                  <Link
                    className="text-secondary text-slate-50 font-semibold text-lg hover:underline"
                    to={`/property/${property._id}`}
                  >
                    {property.name}
                  </Link>
                  <p className="text-gray-500 truncate">
                    {property.description}
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => handlePropetyDeletion(property._id)}
                    className="text-red-600 uppercase hover:underline mb-2"
                  >
                    Delete
                  </button>
                  <Link to={`/updateproperty/${property._id}`}>
                    <button className="text-green-600 uppercase hover:underline">
                      Edit
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-700">No properties found.</p>
          )}
        </>
      )}
    </div>
  );
}

export default PropertyList;
