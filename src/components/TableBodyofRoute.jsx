// TableBody.js
import React from 'react';
import { useState } from 'react';
import EditRouteModal from './EditRouteModal';
import axiosInstance from './AxiosInstance';
// import { useNavigate } from 'react-router-dom';
const TableBody = ({ FilteredRoutes }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const navigate = useNavigate();


    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const onDelete = async (RouteId) => {
        try {
            await axiosInstance.delete('/user/deleteRoute/', {
                data: { routeId: RouteId },
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('JWTToken')}`,
                },
              });        
                  // navigate('/ADminBusRoute');
            console.log('Route with ID deleted successfully.');

        } catch (error) {
            console.error('Error deleting route:', error);
        }
    };
    console.log('list:', FilteredRoutes);

    return (
        <>
            <tbody>
        {FilteredRoutes.length > 0 ? (
            FilteredRoutes.map((route) => (
                <tr key={route.routeID}>
                    
                    <td className="w-1/5 text-center">{route.routeID}</td>
                    <td className="w-1/5 text-center">{route.routeName}</td>
                    <td className="w-1/5 text-center">{route.startLocation}</td>
                    <td className="w-1/5 text-center">{route.endLocation}</td>
                    <td className="w-1/5 text-center">{route.totalTime}</td>
                    <td className="w-1/5 text-center">
                        {/* <button className="text-blue-600 hover:underline " onClick={toggleModal}>Edit</button> */}
                        <button
                            className="text-red-600 hover:underline ml-2"
                            onClick={() => onDelete(route.routeID)} // Pass the routeId here
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan="6" className="text-center">
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
