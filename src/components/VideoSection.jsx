import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import { CountUp } from "countup.js";
import "leaflet/dist/leaflet.css";
import '../styles/StatsSection.css';
import axiosInstance from "../services/axios"; // Import axiosInstance

// Buat marker icon custom
const createMarkerIcon = () => {
    return L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });
};

const DampakAksi = () => {
    const [locations, setLocations] = useState([]);
    const mapRef = useRef(null);
    const [markers, setMarkers] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);

    // State to hold dynamic counts from the backend
    const [statsData, setStatsData] = useState([
        { count: 0, label: "Event Tanam Pohon" },
        { count: 0, label: "Bank Sampah" },
        { count: 0, label: "Relawan" },
        { count: 0, label: "Laporan lingkungan" },
    ]);

    // Fetch locations from backend
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                // Using axiosInstance for GET request to /api/locations
                const response = await axiosInstance.get('/locations');
                
                const parsedData = response.data.map(loc => ({
                    ...loc,
                    latitude: parseFloat(loc.latitude), // Konversi ke number
                    longitude: parseFloat(loc.longitude) // Konversi ke number
                }));
                setLocations(parsedData);
            } catch (error) {
                console.error("Gagal mengambil data lokasi:", error);
                // Optional: Provide user feedback for error
                alert("Terjadi kesalahan saat memuat lokasi. Silakan coba lagi.");
            }
        };

        fetchLocations();
    }, []);

    // Fetch counts from backend for stats cards
    useEffect(() => {
        const fetchCounts = async () => {
            try {
                // Using axiosInstance for GET request to /api/public-stats/counts
                const response = await axiosInstance.get('/public-stats/counts');
                const counts = response.data;
                
                // Update the statsData state with fetched counts
                setStatsData([
                    { count: counts.eventCount, label: "Event Tanam Pohon" },
                    { count: counts.bankSampahCount, label: "Bank Sampah" },
                    { count: counts.relawanCount, label: "Relawan" },
                    { count: counts.reportCount, label: "Laporan lingkungan" },
                ]);
            } catch (error) {
                console.error("Gagal mengambil data jumlah:", error);
                // Optional: Provide user feedback for error
                alert("Terjadi kesalahan saat memuat statistik. Silakan coba lagi.");
            }
        };

        fetchCounts();
    }, []); // Run once on component mount

    // CountUp logic (run whenever statsData changes)
    useEffect(() => {
        const cards = document.querySelectorAll(".cardu"); // Select elements by .cardu

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const el = entry.target.querySelector(".countk"); // Select elements by .countk
                    const endVal = parseInt(entry.target.dataset.count); // Ensure endVal is an integer
                    
                    if (el && !isNaN(endVal)) { // Check if element exists and endVal is a number
                        const countUp = new CountUp(el, endVal, { duration: 2 });
                        if (!countUp.error) {
                            countUp.start();
                            obs.unobserve(entry.target);
                            entry.target.style.opacity = "1";
                        } else {
                            console.error("CountUp error:", countUp.error);
                        }
                    }
                }
            });
        }, { threshold: 0.3 });

        cards.forEach((card) => {
            observer.observe(card);
        });

        // Clean up observer on component unmount
        return () => {
            cards.forEach((card) => {
                observer.unobserve(card);
            });
        };
    }, [statsData]); // Rerun effect when statsData changes

    useEffect(() => {
        if (!mapRef.current && document.getElementById('map')) {
            const mapInstance = L.map("map").setView([-6.2, 106.816666], 11);

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "Peta oleh OpenStreetMap",
            }).addTo(mapInstance);

            mapRef.current = mapInstance;
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        const map = mapRef.current;
        if (map && locations.length > 0) {
            // Remove existing markers before adding new ones
            markers.forEach(marker => map.removeLayer(marker));
            
            const newMarkers = locations.map(location => {
                const marker = L.marker([location.latitude, location.longitude], {
                    icon: createMarkerIcon()
                })
                    .addTo(map)
                    .bindPopup(`<b>${location.name}</b><p>${location.description}</p>`);
                
                marker.on('click', () => {
                    setSelectedLocation(location);
                });

                return marker;
            });

            setMarkers(newMarkers);

            // Optional: Adjust map view to fit all markers
            if (newMarkers.length > 0) {
                const group = new L.featureGroup(newMarkers);
                map.fitBounds(group.getBounds().pad(0.5)); // pad adds some padding
            }
        }
    }, [locations]); // Depend on locations, not markers here, as markers are derived from locations

    useEffect(() => {
        const map = mapRef.current;
        if (map && selectedLocation) {
            map.flyTo([selectedLocation.latitude, selectedLocation.longitude], 15);
            
            // Re-find the marker to ensure it's still on the map (if markers state was reset)
            const selectedMarker = markers.find(marker =>
                marker.getLatLng().lat === selectedLocation.latitude &&
                marker.getLatLng().lng === selectedLocation.longitude
            );
            
            if (selectedMarker) {
                selectedMarker.openPopup();
            }
        }
    }, [selectedLocation, markers]);


    return (
        <div className="dampak-aksi-container">
            <header>
                <h1>Statistik Dampak Aksi Hijau</h1>
                <p style={{ marginTop: "10px" }}>Langkah nyata, bumi lebih sehat 🌱</p>
            </header>

            <section className="statsk">
                {statsData.map((item, index) => (
                    <div className="cardu" data-count={item.count} key={index}>
                        <div className="leaf-icon leaf-left">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/765/765400.png"
                                alt="Leaf"
                            />
                        </div>
                        <div className="leaf-icon leaf-right">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/765/765400.png"
                                alt="Leaf"
                            />
                        </div>
                        <h2 className="countk">0</h2> {/* Initial value for CountUp */}
                        <p>{item.label}</p>
                    </div>
                ))}
            </section>

            <div className="map-location-container">
                <div className="location-list">
                    <h2>Daftar Lokasi Aksi</h2>
                    <div className="location-scroll-container">
                        {locations.map((location) => (
                            <div
                                key={location.id}
                                className={`location-card ${selectedLocation?.id === location.id ? 'active' : ''}`}
                                onClick={() => setSelectedLocation(location)}
                            >
                                <h3>{location.name}</h3>
                                <p>{location.description}</p>
                                <div className="location-coords">
                                    <span>Lat: {location.latitude.toFixed(4)}</span>
                                    <span>Lng: {location.longitude.toFixed(4)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div id="map"></div>
            </div>
        </div>
    );
};

export default DampakAksi;