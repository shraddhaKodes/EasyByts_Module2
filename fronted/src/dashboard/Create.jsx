import React, { useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Create = () => {
  const [formData, setFormData] = useState({
    userId: "", // Replace with actual user ID
    title: "",
    description: "",
    privacy: "Public",
    medium: "Online",
    startDateTime: "",
    endDateTime: "",
    duration: "",
    language: "",
    maxParticipants: 1,
    category: "All",
    termsAndConditions: "",
    locationName: "",
    latitude: "",
    longitude: "",
    acceptingRSVPs: true,
    featureImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, featureImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await axios.post(`${BASE_URL}/event/create`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true, // Ensures cookies (tokens) are included
      });
      alert("Event created successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error creating event:", error.response?.data || error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-4">Create Event</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        <input type="text" name="title" placeholder="Event Title" onChange={handleChange} required className="w-full p-2 border rounded" />
        <textarea name="description" placeholder="Description" onChange={handleChange} required className="w-full p-2 border rounded" />
        
        <select name="privacy" onChange={handleChange} className="w-full p-2 border rounded">
          <option value="Public">Public</option>
          <option value="Private">Private</option>
        </select>
        
        <select name="medium" onChange={handleChange} className="w-full p-2 border rounded">
          <option value="Online">Online</option>
          <option value="In Person">In Person</option>
        </select>
        
        {formData.medium === "In Person" && (
          <>
            <input type="text" name="locationName" placeholder="Location Name" onChange={handleChange} className="w-full p-2 border rounded" />
            <input type="number" name="latitude" placeholder="Latitude" onChange={handleChange} className="w-full p-2 border rounded" />
            <input type="number" name="longitude" placeholder="Longitude" onChange={handleChange} className="w-full p-2 border rounded" />
          </>
        )}
        
        <input type="datetime-local" name="startDateTime" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="datetime-local" name="endDateTime" onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="text" name="duration" placeholder="hh:mm" onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="text" name="language" placeholder="Language" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="number" name="maxParticipants" min="1" placeholder="Max Participants" onChange={handleChange} required className="w-full p-2 border rounded" />
        
        <select name="category" onChange={handleChange} className="w-full p-2 border rounded">
          {["All", "Music", "Games", "Sports", "Arts", "Film", "Literature", "Technology", "Culture", "Lifestyle", "Charity", "Fashion", "Kids", "Other"].map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        
        <textarea name="termsAndConditions" placeholder="Terms and Conditions" onChange={handleChange} required className="w-full p-2 border rounded" />
        
        <label className="flex items-center space-x-2">
          <input type="checkbox" name="acceptingRSVPs" checked={formData.acceptingRSVPs} onChange={() => setFormData({ ...formData, acceptingRSVPs: !formData.acceptingRSVPs })} />
          <span>Accepting RSVPs</span>
        </label>
        
        <input type="file" name="featureImage" onChange={handleFileChange} required className="w-full p-2 border rounded" />
        
        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700">Create Event</button>
      </form>
    </div>
  );
};

export default Create;