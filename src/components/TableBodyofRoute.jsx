// TableBody.js
import React from 'react';
import { useState } from 'react';
import EditRouteModal from './EditRouteModal';
import axiosInstance from './AxiosInstance';

const TableBody = ({ FilteredRoutes }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const onDelete = async (RouteId) => {
        try {
            await axiosInstance.delete('/user/routes/',{data:{routeId:RouteId}});
            console.log('Route with ID deleted successfully.');
        } catch (error) {
            console.error('Error deleting route:', error);
        }
    };

    return (
        <>
            <tbody>
                {FilteredRoutes.length > 0 ? (
                    FilteredRoutes.map((route) => (
                        <tr key={route.RouteId}>
                            <td>{route.RouteId}</td>
                            <td>{route.RouteName}</td>
                            <td>{route.StartLocation}</td>
                            <td>{route.ToLocation}</td>
                            <td>{route.TotalTime}</td>
                            <td>
                                <button className="text-blue-600 hover:underline">Edit</button>
                                <button 
    className="text-red-600 hover:underline ml-2" 
    onClick={() => onDelete(route.RouteId)} // Pass the routeId here
>
    Delete
</button>                            </td>
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
