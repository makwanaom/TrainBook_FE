import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  
  const totalSeats = 80; 
  const [seats, setSeats] = useState(new Array(totalSeats).fill("available")); // Initialize all seats as available
  const [seatCount, setSeatCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [availableSeatsCount, setAvailableSeatsCount] = useState(totalSeats); // Start with all seats available
  const [bookedSeatsCount, setBookedSeatsCount] = useState(0); // No seats booked initially

  // Function to fetch seat data
  const fetchSeats = async () => {
    try {
      const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage after login
      const response = await axios.get("https://trainbook-be.onrender.com/api/seats/availability", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const seatData = response.data; 
      const updatedSeats = new Array(totalSeats).fill("available");

      seatData.forEach((seat) => {
        updatedSeats[seat.id - 1] = seat.reserved ? "booked" : "available"; // Update seat status
      });

      setSeats(updatedSeats);
      setAvailableSeatsCount(seatData.filter((seat) => !seat.reserved).length);
      setBookedSeatsCount(seatData.filter((seat) => seat.reserved).length);
    } catch (error) {
      console.error("Failed to fetch seat data:", error);
    }
  };

  // Fetch seat availability on mount
  useEffect(() => {
    fetchSeats();
  }, []);

  // Handle seat search for a specific number of seats
  const handleFindSeats = async () => {
    if (seatCount > 7) {
      alert("You can book a maximum of 7 seats at a time.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://trainbook-be.onrender.com/api/seats/reserve",
        { count: seatCount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const reservedSeats = response.data; // Array of reserved seat objects
      const updatedSeats = [...seats];

      reservedSeats.forEach((seat) => {
        updatedSeats[seat.id - 1] = "booked"; // Mark seats as booked
      });

      setSeats(updatedSeats);
      setAvailableSeatsCount(
        availableSeatsCount - reservedSeats.length
      ); // Decrease available seats count
      setBookedSeatsCount(bookedSeatsCount + reservedSeats.length); // Increase booked seats count
    } catch (error) {
      console.error("Failed to book seats:", error);
      alert("Failed to book seats. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle refresh button click
  const handleRefresh = () => {
    setSeats(new Array(totalSeats).fill("available")); // Reset all seats to available
    setSeatCount(0); 
    fetchSeats(); // Fetch the latest seat data from backend
  };

  // Render seats layout
  const renderSeats = () => {
    const rows = [];
    let seatIndex = 0;

    for (let i = 0; i < 12; i++) {
      const seatsInRow = i === 11 ? 3 : 7; // Last row has 3 seats
      const rowSeats = [];

      for (let j = 0; j < seatsInRow; j++) {
        const seatStatus = seats[seatIndex];

        rowSeats.push(
          <button
            key={seatIndex}
            className={`w-16 h-16 rounded text-center ${seatStatus === "booked"
                ? "bg-red-500"
                : seatStatus === "available"
                  ? "bg-blue-500"
                  : "bg-green-500"
              } text-white`}
          >
            {seatIndex + 1}
          </button>
        );

        seatIndex++;
      }

      rows.push(
        <div key={i} className="flex gap-2 justify-center mb-2">
          {rowSeats}
        </div>
      );
    }

    return rows;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Display Available and Booked Seat Counts */}
      <div className="flex justify-between w-full max-w-md mb-6 text-xl font-bold">
        <div className="text-blue-600">
          Available Seats: {availableSeatsCount}
        </div>
        <div className="text-red-600">
          Booked Seats: {bookedSeatsCount}
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-6">Train Seat Booking</h1>

      {/* Input for number of seats */}
      <div className="mb-4">
        <input
          type="number"
          placeholder="Enter number of seats"
          className="border rounded p-2 mr-2"
          onChange={(e) => setSeatCount(Number(e.target.value))}
        />
        <button
          onClick={handleFindSeats}
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Finding..." : "Find Seats"}
        </button>
      </div>

      {/* Refresh button */}
      <button
        onClick={handleRefresh}
        className="bg-gray-600 text-white px-4 py-2 rounded mb-6"
      >
        Refresh
      </button>

      {/* Render Seat Layout */}
      <div className="flex flex-col items-center">
        {renderSeats()}
      </div>
    </div>
  );
};

export default Home;
