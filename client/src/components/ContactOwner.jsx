import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function ContactOwner({ propertyData }) {
  const [contactOwner, setContactOwner] = useState(null);
  const [messageToOwner, setMessageToOwner] = useState("");

  function textingOwner(e) {
    setMessageToOwner(e.target.value);
  }
  console.log("message written by someother guy", messageToOwner);
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
        <div className="flex flex-col gap-2">
          <p>
            Contact{" "}
            <span className="font-semibold">{contactOwner.userName}</span> for{" "}
            <span className="font-semibold">
              {propertyData.name.toLowerCase()}
            </span>
          </p>
          <textarea
            name="message"
            id="message"
            rows={2}
            value={messageToOwner}
            onChange={textingOwner}
            placeholder="enter your message here..."
            className="w-full borde p-3 rounded-lg"
          ></textarea>
          <Link
            to={`mailto:${contactOwner.email}?subject=Regarding ${propertyData.name}&body=${messageToOwner}`}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}

export default ContactOwner;
