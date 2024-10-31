// TableBody.js
import React from 'react';
import { useState } from 'react';
import EditRouteModal from './EditRouteModal';

const TableBody = ({ FilteredRoutes }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <>
            <tbody>
                {FilteredRoutes.length > 0 ? (
                    FilteredRoutes.map((route) => (
                        <tr key={route.routeId}>
                            <td>{route.routeId}</td>
                            <td>{route.fromLocation}</td>
                            <td>{route.toLocation}</td>
                            <td>{route.duration}</td>
                            <td>{route.departureTime}</td>
                            <td>{route.arrivalTime}</td>
                            <td>
                                <button className="text-blue-600 hover:underline">Edit</button>
                                <button className="text-red-600 hover:underline ml-2">Delete</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7" className="text-center">
                            No routes found.
                        </td>
                    </tr>
                )}
            </tbody>
            <EditRouteModal isOpen={isModalOpen} toggleModal={toggleModal} routeData={FilteredRoutes} />
        </>
    );
};

export default TableBody;
