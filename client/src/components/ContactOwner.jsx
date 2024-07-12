// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function ContactOwner({ propertyData }) {
  const [contactOwner, setContactOwner] = useState(null);
  const [messageToOwner, setMessageToOwner] = useState("");

  function textingOwner(e) {
    setMessageToOwner(e.target.value);
  }

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const res = await fetch(`/api/users/${propertyData.userRefs}`);
        const data = await res.json();
        setContactOwner(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOwner();
  }, [propertyData.userRefs]);

  return (
    <>
      {contactOwner && (
        <div className="flex flex-col gap-4 p-4 bg-gray-800 rounded-lg shadow-md">
          <p className="text-xl text-gray-200">
            Contact{" "}
            <span className="font-semibold text-blue-400">
              {contactOwner.userName}
            </span>{" "}
            regarding{" "}
            <span className="font-semibold text-blue-400">
              {propertyData.propertyTitle.toLowerCase()}
            </span>
          </p>
          <textarea
            name="message"
            id="message"
            rows={4}
            value={messageToOwner}
            onChange={textingOwner}
            placeholder="Enter your message here..."
            className="w-full border border-gray-600 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400"
          ></textarea>
          <Link
            to={`mailto:${contactOwner.email}?subject=Regarding ${propertyData.propertyTitle}&body=${messageToOwner}`}
            className="bg-blue-600 text-white text-center py-3 uppercase rounded-lg hover:bg-blue-500 transition"
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}

export default ContactOwner;
