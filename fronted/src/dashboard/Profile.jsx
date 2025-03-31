import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaInstagram, FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/profile`, {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching profile:", error.response?.data || error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500 mt-6">Loading profile...</p>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-13 rounded-2xl shadow-lg mt-10 border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-6 font-poppins">Profile</h2>

      <div className="flex flex-col items-center">
        <img
          src={user?.avatar?.url}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 shadow-md"
        />
        <h3 className="text-2xl font-semibold text-gray-800 mt-4">{user?.fullName}</h3>
        <p className="text-gray-500 text-lg">{user?.email}</p>
      </div>

      <div className="mt-6 space-y-4 text-lg">
        <p>
          <strong className="text-black">Phone:</strong>{" "}
          <span className="text-blue-600">{user?.phone || "Not Provided"}</span>
        </p>
        <p>
          <strong className="text-black">About Me:</strong>{" "}
          <span className="text-blue-600">{user?.aboutMe || "No description available."}</span>
        </p>
      </div>

      {/* Social Links */}
      <div className="mt-6 flex justify-center space-x-5">
        {user?.instagramURL && (
          <a
            href={user.instagramURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-600 text-2xl transition-transform transform hover:scale-110"
          >
            <FaInstagram />
          </a>
        )}
        {user?.twitterURL && (
          <a
            href={user.twitterURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-500 text-2xl transition-transform transform hover:scale-110"
          >
            <FaTwitter />
          </a>
        )}
        {user?.linkedInURL && (
          <a
            href={user.linkedInURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 text-2xl transition-transform transform hover:scale-110"
          >
            <FaLinkedin />
          </a>
        )}
        {user?.facebookURL && (
          <a
            href={user.facebookURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:text-blue-800 text-2xl transition-transform transform hover:scale-110"
          >
            <FaFacebook />
          </a>
        )}
      </div>
    </div>
  );
};

export default Profile;
