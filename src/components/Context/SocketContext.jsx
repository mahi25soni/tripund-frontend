import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socketInstance = io('http://localhost:5000'); 

    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      console.log('Connected to Socket.io server');
    });

    socketInstance.on('disconnect', () => {
      console.log('Disconnected from Socket.io server');
    });

    socketInstance.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    socketInstance.on('new_order', (order) => {
      if (order.orderId && order.user_phone) {
        // Play notification sound
        const audio = new Audio('/notification.mp3'); 
        audio.play();

        // Update notifications state
        setNotifications(prev => [
          ...prev,
          { id: order.orderId, message: `New order received from ${order.user_phone}. Order ID: ${order.orderId}`, type: 'order_created', read: false, createdAt: new Date() }
        ]);
      } else {
        console.error('Order ID or user phone is missing:', order);
      }
    });

    

    return () => {
      socketInstance.disconnect();
      console.log('Socket disconnected');
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, notifications, setNotifications }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
