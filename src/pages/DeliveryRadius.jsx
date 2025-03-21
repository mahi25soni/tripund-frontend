import React, { useState, useEffect, useRef, useCallback } from "react";
import { GoogleMap, LoadScript, Marker, Circle, Autocomplete } from "@react-google-maps/api";
import axios from "../../axios";
import { toast, ToastContainer } from "react-toastify";

const DeliveryRadius = () => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [mapCenter, setMapCenter] = useState(null);
  const [radius, setRadius] = useState(5000); // Default radius in meters (5km)
  const [address, setAddress] = useState("");
  const autocompleteRef = useRef(null);
  const mapRef = useRef(null);


  // Fetch address from coordinates
  const fetchAddressFromLatLng = useCallback(async (lat, lng) => {
    try {
      const response = await axios.get(`/store/gmap/geocode?lat=${lat}&lng=${lng}`);
      const formattedAddress = response.data.results[0]?.formatted_address;
      setAddress(formattedAddress || "");
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  }, []);

  // Get user's current location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newPosition = { lat: latitude, lng: longitude };
          setMarkerPosition(newPosition);
          setMapCenter(newPosition);
          fetchAddressFromLatLng(latitude, longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
          const defaultPosition = { lat: 28.6139, lng: 77.2088 };
          setMarkerPosition(defaultPosition);
          setMapCenter(defaultPosition);
          fetchAddressFromLatLng(defaultPosition.lat, defaultPosition.lng);
        }
      );
    }
  }, [fetchAddressFromLatLng]);

  // Handle marker drag event
  const onMarkerDragEnd = (event) => {
    const newPosition = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    setMarkerPosition(newPosition);
    setMapCenter(newPosition);
    fetchAddressFromLatLng(newPosition.lat, newPosition.lng);
  };

  // Handle place selection from Autocomplete
  const onPlaceSelect = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry) {
        const newPosition = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setMarkerPosition(newPosition);
        setMapCenter(newPosition);
        setAddress(place.formatted_address);
      }
    }
  };

  // Save Delivery Radius and Location to Backend
  const handleSave = async () => {
    if (!markerPosition || !radius || !address) {
      alert("Please set the location, radius, and address.");
      return;
    }

    const formData = new FormData();
    formData.append("deliveryRadius", radius);
    formData.append("location[coordinates][latitude]", markerPosition.lat);
    formData.append("location[coordinates][longitude]", markerPosition.lng);
    formData.append("address", address);

    try {
      const token = localStorage.getItem("token"); 
      const response = await axios.put("/store/editStore", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", 
        },
      });

      toast.success("Successfully Set.");
      
    } catch (error) {
      console.error("Error updating store details:", error);
      toast.error("Failed");
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDqp6ukm--d3iZKhlH23VgiGVieq4HsH4Q" libraries={["places"]}>
      <div className="relative w-full h-[500px]">
        <ToastContainer/>
        {/* Search Input */}
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          onPlaceChanged={onPlaceSelect}
        >
          <input
            type="text"
            className="absolute top-3 left-1/2 transform -translate-x-1/2 z-10 w-4/5 md:w-2/3 p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none"
            placeholder="Search location..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Autocomplete>

        {/* Google Map */}
        {mapCenter && markerPosition && (
          <GoogleMap
            mapContainerStyle={{ height: "100%", width: "100%" }}
            zoom={14}
            center={mapCenter}
            onLoad={(map) => (mapRef.current = map)}
          >
            <Marker position={markerPosition} draggable onDragEnd={onMarkerDragEnd} />
            <Circle center={markerPosition} radius={radius} options={{ fillColor: "#FF6600", strokeWeight: 2 }} />
          </GoogleMap>
        )}

        {/* Radius Control Slider */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-lg shadow-md flex flex-col items-center">
          <label className="text-sm font-semibold mb-1">Radius: {(radius / 1000).toFixed(1)} km</label>
          <input
            type="range"
            min="1000"
            max="10000"
            step="500"
            value={radius}
            onChange={(e) => setRadius(parseInt(e.target.value))}
            className="w-40"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white p-4 w-2/5 mt-4 rounded-md font-semibold justify-center"
        >
          Set Radius
        </button>
      </div>
    </LoadScript>
  );
};

export default DeliveryRadius;
