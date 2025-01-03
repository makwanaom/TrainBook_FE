# Train Seat Booking Frontend

This is the frontend of a Train Seat Booking system built with React.js and styled using Tailwind CSS. The application fetches seat availability data from the backend, allows users to reserve seats, and provides a refresh feature to reset all reservations.

---

## Features

- Fetch seat availability from the backend.
- Book up to 7 seats at a time.
- Refresh button to reset all seat reservations.
- Real-time updates on available and booked seats.
- Clean UI styled with Tailwind CSS.

---

## Steps for Usage

1. **Installation**: Clone the repository and install dependencies with `npm install`.
2. **Start Development Server**: Run the project using `npm start`.
3. **Login Required**: Ensure you log in and have a token stored in `localStorage`.
4. **Seat Booking**: Enter the number of seats (max 7) and click "Find Seats" to reserve.
5. **Refresh Seats**: Click "Refresh" to reset all bookings.

---

## Visual Representation

- **Available Seats**: Blue
- **Booked Seats**: Red
- The total number of available and booked seats is displayed above the seat layout.

---

## Note

- This application relies on backend APIs for fetching and updating seat statuses.
- Ensure the backend server is running and accessible at the configured API endpoints.
