import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../pages/miniComponents/Navbar";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
import axios from "axios";

const EventView = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/event/${eventId}`)
      .then((res) => res.json())
      .then((data) => setEvent(data))
      .catch((error) => console.error("Error fetching event:", error));
  }, [eventId]);

  if (!event) {
    return (
      <p className="text-center text-gray-500 mt-20 text-lg">
        Loading event details...
      </p>
    );
  }
  const handleRSVP = async (eventId, receiverId) => {
    const token = localStorage.getItem("token");

    console.log("Event ID:", eventId);
    console.log("Receiver ID:", receiverId);
    console.log("Token:", token);

    if (!token) {
      alert("You need to log in first!");
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/rsvp/${eventId}`,
        { receiverId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("RSVP Response:", response.data);
      alert(response.data.message);
    } catch (error) {
      console.error("RSVP Error:", error.response?.data || error);
      alert(error.response?.data?.message || "Failed to send RSVP!");
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-xl mt-20">
        {/* Event Image */}
        <img
          src={event.featureImage?.url}
          alt={event.title}
          className="w-full h-80 object-cover rounded-xl shadow-lg"
        />

        {/* Event Title & Description */}
        <div className="mt-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            {event.title}
          </h2>
          <p className="text-gray-600 text-lg">{event.description}</p>
        </div>

        {/* Event Details */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <p className="text-gray-700 font-semibold">
              📅 <strong>Date:</strong>{" "}
              {new Date(event.startDateTime).toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <p className="text-gray-700 font-semibold">
              📍 <strong>Location:</strong>{" "}
              {event.locationName || "Online Event"}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <p className="text-gray-700 font-semibold">
              🌍 <strong>Medium:</strong> {event.medium}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <p className="text-gray-700 font-semibold">
              🏷️ <strong>Category:</strong> {event.category}
            </p>
          </div>
        </div>

        {/* RSVP & Share Buttons */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <button
            onClick={() => handleRSVP(event._id, event.userId)}
            className="w-full md:w-auto bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            🎟️ RSVP Now
          </button>
          <button
            className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            onClick={() => {
              const subject = encodeURIComponent(`Invitation: ${event.title}`);
              const body = encodeURIComponent(
                `Hey,\n\nCheck out this amazing event: ${
                  event.title
                }\n\nDescription: ${event.description}\n\nDate: ${new Date(
                  event.startDateTime
                ).toLocaleString()}\n\nJoin here: ${
                  window.location.href
                }\n\nHope to see you there!`
              );
              window.location.href = `mailto:?subject=${subject}&body=${body}`;
            }}
          >
            🔗 Share Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventView;
