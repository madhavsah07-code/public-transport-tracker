import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import RouteSelector from "./components/RouteSelector";
import TransportList from "./components/TransportList";
import "./App.css";

function App() {
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newRoute, setNewRoute] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [selectedZone, setSelectedZone] = useState("");
  const [searched, setSearched] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
const [bookingSuccess, setBookingSuccess] = useState(false);
const [bookingId, setBookingId] = useState(null);

const [theme, setTheme] = useState("dark");

useEffect(() => {
  document.body.className = theme;
}, [theme]);

const toggleTheme = () => {
  setTheme((prev) => (prev === "dark" ? "light" : "dark"));
};

  const fetchTransportData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=30"
      );
      const data = await response.json();

      const routeNumbers = [
        "101A", "102B", "201", "305", "410X",
        "77", "88A", "12C", "501", "900"
      ];
      const transportTypes = ["Bus", "Car", "Bike", "Train"];

     const formatted = data.map((item) => ({
  id: item.id,
  route: routeNumbers[Math.floor(Math.random() * routeNumbers.length)],
  type: transportTypes[Math.floor(Math.random() * transportTypes.length)],
  arrival: Math.floor(Math.random() * 20) + 1,
  status: item.completed ? "On Time" : "Delayed",
  description: item.title,
  zone: item.userId,
  price: Math.floor(Math.random() * 400) + 100
}));

      setRoutes(formatted);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.log("API Error", error);
    }
    setLoading(false);
  };

  const addRoute = () => {
    if (!newRoute) return;

    const newEntry = {
      id: Date.now(),
      route: newRoute,
      type: "Bus",
      arrival: Math.floor(Math.random() * 20) + 1,
      status: "On Time",
    };

    setRoutes((prev) => [newEntry, ...prev]);
    setNewRoute("");
  };

  useEffect(() => {
    fetchTransportData();

    const interval = setInterval(() => {
      fetchTransportData();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  const uniqueZones = [...new Set(routes.map(r => r.zone))];

  const filteredRoutes = routes.filter((r) => {
    const routeMatch = selectedRoute ? r.route === selectedRoute : true;
    const typeMatch = selectedType ? r.type === selectedType : true;
    const zoneMatch = selectedZone ? r.zone === Number(selectedZone) : true;

    return routeMatch && typeMatch && zoneMatch;
  });

  const totalRoutes = filteredRoutes.length;
  const onTimeCount = filteredRoutes.filter(r => r.status === "On Time").length;
  const delayedCount = filteredRoutes.filter(r => r.status === "Delayed").length;
  const totalZones = uniqueZones.length;

  const perfectMatch =
    filteredRoutes.length > 0
      ? filteredRoutes.reduce((prev, curr) =>
          prev.arrival < curr.arrival ? prev : curr
        )
      : null;

  const handleSearch = () => {
    if (!from || !to) {
      alert("Please enter both From and To locations");
    }
  };
  const handleBook = (trip) => {
  setSelectedTrip(trip);
};

const closeModal = () => {
  setSelectedTrip(null);
};

  return (
    <>
      <Navbar toggleTheme={toggleTheme} theme={theme} />
      <Hero
        from={from}
        setFrom={setFrom}
        to={to}
        setTo={setTo}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        handleSearch={handleSearch}
      />

      <div className="container">
        <h1>Public Transport Tracker</h1>

        <RouteSelector
          routes={routes}
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
        />

        <select
          value={selectedZone}
          onChange={(e) => setSelectedZone(e.target.value)}
        >
          <option value="">All Zones</option>
          {uniqueZones.map((zone) => (
            <option key={zone} value={zone}>
              Zone {zone}
            </option>
          ))}
        </select>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Bus">Bus</option>
          <option value="Car">Car</option>
          <option value="Bike">Bike</option>
          <option value="Train">Train</option>
        </select>

        <div className="add-route">
          <input
            type="text"
            placeholder="Add Route (e.g. 777X)"
            value={newRoute}
            onChange={(e) => setNewRoute(e.target.value)}
          />
          <button onClick={addRoute}>Add</button>
        </div>

        <button onClick={fetchTransportData} className="refresh-btn">
          Refresh
        </button>

        {loading && <div className="spinner"></div>}

        <p className="update-time">
          Last Updated: {lastUpdated || "Loading..."}
        </p>

        {perfectMatch && from && to && (
          <div className="perfect-match">
            <h3>Best Option 🚀</h3>
            <p>{from} ➡️ {to}</p>
            <p>Mode: {perfectMatch.type}</p>
            <p>Arrival in {perfectMatch.arrival} mins</p>
          </div>
        )}

        <div className="stats-grid">
          <div className="stat-card">
            <h3>{totalRoutes}</h3>
            <p>Total Routes</p>
          </div>

          <div className="stat-card">
            <h3>{onTimeCount}</h3>
            <p>On Time</p>
          </div>

          <div className="stat-card">
            <h3>{delayedCount}</h3>
            <p>Delayed</p>
          </div>

          <div className="stat-card">
            <h3>{totalZones}</h3>
            <p>Total Zones</p>
          </div>
        </div>

      <TransportList 
        routes={filteredRoutes} 
        onBook={handleBook}
      />
      </div>

      {selectedTrip && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Trip Details</h2>

            <p><strong>Route:</strong> {selectedTrip.route}</p>
            <p><strong>Mode:</strong> {selectedTrip.type}</p>
            <p><strong>Zone:</strong> {selectedTrip.zone}</p>
            <p><strong>Status:</strong> {selectedTrip.status}</p>
            <p><strong>Arrival:</strong> {selectedTrip.arrival} mins</p>
            <p><strong>Price:</strong> ₹{selectedTrip.price}</p>
            <p><strong>Journey:</strong> {from} ➡ {to}</p>

            {!isProcessing && !bookingSuccess && (
              <>
                <button
                  className="book-btn"
                  onClick={() => {
                    setIsProcessing(true);

                    setTimeout(() => {
                      const id =
                        "TRIP" + Math.floor(Math.random() * 1000000);
                      setBookingId(id);
                      setIsProcessing(false);
                      setBookingSuccess(true);
                    }, 2000);
                  }}
                >
                  Confirm Booking
                </button>

                <button onClick={closeModal} className="close-btn">
                  Close
                </button>
              </>
            )}

            {isProcessing && (
              <div className="processing">
                ⏳ Processing Payment...
              </div>
            )}

            {bookingSuccess && (
              <div className="ticket">
                <h2>🎉 Booking Successful!</h2>

                <p><strong>Booking ID:</strong> {bookingId}</p>
                <p><strong>Route:</strong> {selectedTrip.route}</p>
                <p><strong>Mode:</strong> {selectedTrip.type}</p>
                <p><strong>Price:</strong> ₹{selectedTrip.price}</p>
                <p><strong>Journey:</strong> {from} ➡ {to}</p>

                <button
                  className="book-btn"
                  onClick={() => {
                    setBookingSuccess(false);
                    setSelectedTrip(null);
                  }}
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;