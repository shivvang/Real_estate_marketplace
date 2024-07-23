// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

const LastVisitedProperties = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [visitedProperties, setVisitedProperties] = useState([]);

  useEffect(() => {
    const fetchVisitedProperties = async () => {
      if (currentUser) {
        try {
          const res = await fetch(
            `/api/LastVisitedProperty/getVisited/${currentUser._id}`
          );
          const data = await res.json();
          if (data.success) {
            setVisitedProperties(data.visitedProperties);
          }
        } catch (error) {
          console.error("Error fetching last visited properties:", error);
        }
      }
    };
    fetchVisitedProperties();
  }, [currentUser]);

  if (visitedProperties.length === 0) {
    return <p>No recently visited properties</p>;
  }

  return (
    <div className="visited-properties bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4">
        Last Visited Properties
      </h2>
      <ul className="space-y-4">
        {visitedProperties.map(({ _id, propertyId, visitedAt }) => (
          <li
            key={_id}
            className="bg-gray-700 p-4 rounded-md flex flex-col gap-2"
          >
            <Link to={`/propertyView/${propertyId._id}`}>
              <p className="text-xl text-white font-semibold">
                {propertyId.propertyTitle}
              </p>
              <p className="text-gray-400 flex items-center gap-2">
                <FaMapMarkerAlt className="text-gray-500" />{" "}
                {propertyId.location}
              </p>
              <p className="text-gray-500">
                Visited: {formatDistanceToNow(new Date(visitedAt))} ago
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LastVisitedProperties;
