import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    droneName: "",
    startTime: "",
    totalDuration: "",
    pilotName: "",
    location: "",
  });
  const [bookings, setBookings] = useState([]); // state for storing bookings

  const user = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const fetchBookings = async () => {
  try {
    if (!user?._id) return;

    const res = await axios.get(`http://localhost:5000/booking/${user._id}`);

    setBookings(res.data.bookings);
  } catch (err) {
    console.error(
      "Error fetching bookings:",
      err.response ? err.response.data : err
    );
    toast.error("Failed to fetch bookings!");
  }
};


const handleBooking = async () => {
  try {
    const { droneName, startTime, totalDuration, pilotName, location } = form;
    const userId = user?._id;

    if (!userId) {
      toast.error("You must be logged in to book a flight!");
      return;
    }

    const res = await axios.post("http://localhost:5000/booking", {
      droneName,
      startTime,
      totalDuration,
      pilotName,
      location,
      userId,
    });

    toast.success("Booking successful!");
    setForm({
      droneName: "",
      startTime: "",
      totalDuration: "",
      pilotName: "",
      location: "",
    });

    fetchBookings(); // refresh bookings
  } catch (err) {
    console.error("Booking error:", err.response ? err.response.data : err);
    toast.error("Booking failed!");
  }
};


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    fetchBookings(); // fetch bookings when component mounts
  }, []);

  return (
    <div className="min-h-screen bg-blue-900 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-blue-950">
        <h1 className="text-xl font-bold">Marut Drones</h1>
        <div className="space-x-6">
          <a href="/" className="hover:underline">
            Home
          </a>
          {user ? (
            <button onClick={handleLogout} className="hover:underline">
              Logout
            </button>
          ) : (
            <>
              <a href="/login" className="hover:underline">
                Login
              </a>
              <a href="/signup" className="hover:underline">
                Signup
              </a>
            </>
          )}
        </div>
      </nav>

      {/* Booking Form */}
      <div className="max-w-4xl mx-auto bg-white text-black p-6 mt-10 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Book Your Flight</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            name="droneName"
            value={form.droneName}
            onChange={handleChange}
            type="text"
            placeholder="Flight Name"
            className="p-3 border rounded"
          />
          <input
            name="startTime"
            value={form.startTime}
            onChange={handleChange}
            type="time"
            placeholder="Starting Time"
            className="p-3 border rounded"
          />
          <input
            name="totalDuration"
            value={form.totalDuration}
            onChange={handleChange}
            type="text"
            placeholder="Total Duration"
            className="p-3 border rounded"
          />
          <input
            name="pilotName"
            value={form.pilotName}
            onChange={handleChange}
            type="text"
            placeholder="Pilot Name"
            className="p-3 border rounded"
          />
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            type="text"
            placeholder="Location"
            className="p-3 border rounded col-span-2"
          />
        </div>
        <div className="mt-6">
          <button
            onClick={handleBooking}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          >
            Book
          </button>
        </div>
      </div>

      {/* Bookings List */}
     {/* Bookings List */}
<div className="max-w-4xl mx-auto bg-white text-black p-6 mt-10 rounded-lg shadow-lg">
  <h2 className="text-2xl font-bold mb-6">Your Bookings</h2>

  <table className="min-w-full border border-gray-300">
    <thead>
      <tr className="bg-gray-200">
        <th className="p-3 border">Drone</th>
        <th className="p-3 border">Start Time</th>
        <th className="p-3 border">Duration</th>
        <th className="p-3 border">Pilot</th>
        <th className="p-3 border">Location</th>
      </tr>
    </thead>
    <tbody>
      {bookings && bookings.length > 0 ? (
        bookings.map((b) => (
          <tr key={b._id} className="text-center">
            <td className="p-3 border">{b.droneName}</td>
            <td className="p-3 border">{b.startTime}</td>
            <td className="p-3 border">{b.totalDuration}</td>
            <td className="p-3 border">{b.pilotName}</td>
            <td className="p-3 border">{b.location}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="5" className="text-center p-3">
            No bookings yet.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>


      <ToastContainer />
    </div>
  );
}
