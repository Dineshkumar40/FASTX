import React, { useEffect, useState } from 'react';
import TableBody from './TableBodyofRoute';
import AddRouteModal from './AddRouteModal';
import axiosInstance from './AxiosInstance';
import { useSelector } from 'react-redux';

const ABusRoute = () => {
    const [routes, setRoutes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRoute, setFilteredRoute] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const userRole = useSelector((state) => state.auth);
    const jwtToken = userRole?.jwtToken;

    // Debounce logic for filtering routes
    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchTerm === '') {
                setFilteredRoute(routes);
            } else {
                const filtered = routes.filter(route => 
                    route.routeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    route.routeID?.toString().toLowerCase().includes(searchTerm.toLowerCase())
                );
                setFilteredRoute(filtered);
            }
        }, 500); // Debounce delay (500ms)

        return () => clearTimeout(handler); // Clean up the previous timeout on change
    }, [searchTerm, routes]); // Re-run debounce logic when searchTerm or routes change

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleRouteAdded = (newRoute) => {
        console.log("Route added:", newRoute);
        setFilteredRoute((prevRoutes) => [...prevRoutes, newRoute]);
    };

    const updateRoutesAfterDeletion = (deletedRouteId) => {
        setFilteredRoute((prevRoutes) =>
            prevRoutes.filter((route) => route.routeID !== deletedRouteId)
        );
    };

    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const response = await axiosInstance.get('/user/getRoutes', {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                });
                setRoutes(response.data);
                setFilteredRoute(response.data); // Initially load all routes
            } catch (error) {
                console.error('Error fetching routes:', error);
            }
        };

        fetchRoutes();
    }, [jwtToken,handleRouteAdded,updateRoutesAfterDeletion]); // Only fetch routes when jwtToken changes

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-4">Routes List</h2>

            {/* Search Bar */}
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    placeholder="Search by Route ID, routeName"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
                    className="border border-gray-300 rounded-lg p-2 flex-grow"
                />
                <button
                    onClick={toggleModal}
                    className="ml-4 text-white bg-red-600 hover:bg-red-700 rounded-lg px-4 py-2"
                >
                    Add Route
                </button>
                <AddRouteModal
                    isOpen={isModalOpen}
                    toggleModal={toggleModal}
                    onRouteAdded={handleRouteAdded}
                    onRouteDelete={updateRoutesAfterDeletion}
                />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="w-1/5 py-3 px-4 border-b">Route ID</th>
                            <th className="w-1/5 py-3 px-4 border-b">Route Name</th>
                            <th className="w-1/5 py-3 px-4 border-b">From Location</th>
                            <th className="w-1/5 py-3 px-4 border-b">To Location</th>
                            <th className="w-1/5 py-3 px-4 border-b">Duration</th>
                            <th className="w-1/5 py-3 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <TableBody FilteredRoutes={filteredRoute} />
                </table>
            </div>
        </div>
    );
};

export default ABusRoute;
