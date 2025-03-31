import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Navbar from "../pages/miniComponents/Navbar";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const categories = [
  "All", "Music", "Games", "Sports", "Arts", "Film", "Literature", 
  "Technology", "Culture", "Lifestyle", "Charity", "Fashion", "Kids", "Other"
];
const eventFilters = ["All", "Offline Events", "Online Events"];

const EventPage = () => {
  const navigate = useNavigate(); 
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categoryRef = useRef(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        let url = `${BASE_URL}/event/getall`;
        let params = new URLSearchParams();

        if (selectedCategory !== "All") {
          params.append("category", selectedCategory);
        }

        if (selectedFilter === "Offline Events") {
          params.append("medium", "In Person");
        } else if (selectedFilter === "Online Events") {
          params.append("medium", "Online");
        }

        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        console.log("API Call:", url); // ✅ Debug API URL
        const response = await axios.get(url);
        setEvents(response.data.events || []);
      } catch (err) {
        setError("Failed to load events. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [selectedCategory, selectedFilter]);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollCategory = (direction) => {
    if (categoryRef.current) {
      categoryRef.current.scrollBy({ left: direction === "left" ? -200 : 200, behavior: "smooth" });
    }
  };
  const handleRSVP = async (eventId, receiverId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/rsvp/${eventId}`, 
      { receiverId }, 
      { withCredentials: true } // Ensuring authentication if needed
    );
    alert(response.data.message); // Show success message
  } catch (error) {
    alert(error.response?.data?.message || "Failed to send RSVP!");
  }
};
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      {/* Page Header */}
      <div className="text-center py-6">
        <h1 className="text-4xl font-bold text-yellow-400">Upcoming Events</h1>
        <p className="text-gray-300 mt-2">Find events by category, type, or search for a specific one.</p>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="🔍 Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-96 px-4 py-2 border border-gray-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Category & Filters */}
        <div className="bg-gray-800 p-5 rounded-lg shadow-lg">
          {/* Category Slider */}
          <div className="relative flex items-center">
            <button onClick={() => scrollCategory("left")} className="absolute left-0 bg-gray-600 p-2 rounded-full z-10">
              <ChevronLeftIcon className="h-6 w-6 text-white" />
            </button>

            <div
              ref={categoryRef}
              className="flex space-x-4 overflow-x-scroll scrollbar-hide px-8 py-3 whitespace-nowrap scroll-smooth"
            >
              {categories.map((cat) => (
                <p
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-medium transition flex-shrink-0 ${
                    selectedCategory === cat ? "bg-yellow-400 text-gray-900" : "bg-gray-700 text-gray-300"
                  } hover:bg-yellow-400 hover:text-gray-900`}
                >
                  {cat}
                </p>
              ))}
            </div>

            <button onClick={() => scrollCategory("right")} className="absolute right-0 bg-gray-600 p-2 rounded-full z-10">
              <ChevronRightIcon className="h-6 w-6 text-white" />
            </button>
          </div>

          {/* Event Type Filters */}
          <div className="flex justify-center gap-4 mt-4">
            {eventFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  selectedFilter === filter ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
                } hover:bg-blue-500`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Events Display */}
        <div className="mt-6">
          {loading ? (
            <p className="text-center text-gray-300">Loading events...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <div key={event._id} className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform">
                  <img src={event.featureImage?.url} alt={event.title} className="w-full h-48 object-cover opacity-90 hover:opacity-100 transition" />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-yellow-400">{event.title}</h2>
                    <p className="text-gray-300 mt-2">{event.description.substring(0, 80)}...</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-sm text-gray-400">{new Date(event.startDateTime).toDateString()}</span>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                        event.privacy === "Public" ? "bg-green-600 text-white" : "bg-red-600 text-white"
                      }`}>
                        {event.privacy}
                      </span>
                    </div>
                    <button onClick={() => navigate(`/events/${event._id}`)}  className="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 rounded-lg">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400">No events found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventPage;
