// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useSelector } from "react-redux";
function ContactLogs() {
  const { currentUser } = useSelector((state) => state.user);
  const [contactLogs, setContactLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContactLogs = async () => {
      try {
        const res = await fetch(`/api/contact/getContacts/${currentUser?._id}`);
        const data = await res.json();
        if (data.success) {
          setContactLogs(data.contactLogs);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContactLogs();
  }, [currentUser?._id]);

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-200 mb-4">Contact Logs</h2>
      {loading && <p className="text-center text-gray-400">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && contactLogs.length === 0 && (
        <p className="text-center text-gray-400">No contact logs found.</p>
      )}
      <ul>
        {contactLogs.map((log) => (
          <li
            key={log?._id}
            className="p-4 bg-gray-800 rounded-lg mb-4 shadow-md"
          >
            <div className="flex flex-col">
              <p className="text-lg text-gray-200 font-semibold">
                Property: {log.propertyId.propertyTitle}
              </p>
              <p className="text-sm text-gray-400">
                Contacted{" "}
                {formatDistanceToNow(new Date(log.contactedAt), {
                  addSuffix: true,
                })}
              </p>
              <p className="text-sm text-gray-400">
                Owner: {log.senderName} (Email: {log.senderEmail})
              </p>
              <p className="mt-2 text-gray-300">{log.message}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactLogs;
