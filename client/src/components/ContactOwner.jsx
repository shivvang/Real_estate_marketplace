/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function ContactOwner({ propertyData }) {
  const { currentUser } = useSelector((state) => state.user);
  const [contactOwner, setContactOwner] = useState(null);
  const [messageToOwner, setMessageToOwner] = useState("");

  function textingOwner(e) {
    setMessageToOwner(e.target.value);
  }
  // //_id: '6698b88336e3cbd717464eb8', userName: 'adityaParmar', email: 'adityaJ@gmail.com', avatar: 'https://hips.hearstapps.com/hmg-prod/images/robert…scars-nominees-luncheon-news-photo-1708713684.jpg', role: 'seller', …}
  // avatar: "https://hips.hearstapps.com/hmg-prod/images/robert-downey-jr-attends-the-96th-oscars-nominees-luncheon-news-photo-1708713684.jpg";
  // createdAt: "2024-07-18T06:38:59.583Z";
  // email: "adityaJ@gmail.com";
  // role: "seller";
  // updatedAt: "2024-07-18T06:38:59.583Z";
  // userName: "adityaParmar";
  // __v: 0;
  // _id: "6698b88336e3cbd717464eb8";
  console.log(contactOwner);
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

  const handleSendMessage = async () => {
    try {
      const response = await fetch("/api/contact/logContact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser._id,
          propertyId: propertyData._id,
          message: messageToOwner,
          senderName: contactOwner.userName,
          senderEmail: contactOwner.email,
        }),
      });

      const result = await response.json();
      if (result.success) {
        console.log("Contact logged successfully");
      } else {
        console.error("Error logging contact:", result.message);
      }
    } catch (error) {
      console.error("Error logging contact:", error);
    }
  };

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
            onClick={handleSendMessage}
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}

export default ContactOwner;
