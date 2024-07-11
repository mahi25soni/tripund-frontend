import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiDownload } from 'react-icons/fi';

const QRCodeGenerator = () => {
    const [storeId, setStoreId] = useState('');
    const [storeName, setStoreName] = useState('');

    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const downloadQRCode = () => {
        const canvas = document.getElementById('qrcode-canvas');
        if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
          console.error('Canvas element not found or invalid');
          return;
        }
      
        const pngUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = `${storeName}_QRCode.png`;
      
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      };
      


    useEffect(() => {
        const fetchStoreData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const config = {
                        headers: { Authorization: `Bearer ${token}` }
                    };
                    console.log('Fetching store ID...');
                    const response = await axios.get('http://localhost:5000/api/store/storeId', config);
                    console.log('Store ID response:', response.data.store._id);
                    setStoreId(response.data.store._id);
                    setStoreName(response.data.store.storeName);
                    // console.log('StoreName: ', response.data.store.storeName)
                } else {
                    console.log('No token found, redirecting to login...');
                    navigate('/login'); 
                }
            } catch (error) {
                console.error('Failed to fetch Store data:', error);
                navigate('/login'); 
            }
        };

        fetchStoreData();
    }, [navigate]);

    useEffect(() => {
        const fetchQrCodeUrl = async (storeId) => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.log('No token found, redirecting to login...');
                    navigate('/login'); 
                    return;
                }

                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                console.log('Fetching QR code URL for storeId:', storeId);
                const response = await axios.get(`http://localhost:5000/api/qrcode/generate-qr/${storeId}`, config);
                console.log('QR Code URL response:', response.data);

                if (!response.data.qrCodeUrl) {
                    throw new Error('QR code URL not found');
                }
                setQrCodeUrl(response.data.qrCodeUrl);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching QR code:', error);
                setError('Error fetching QR code');
                setLoading(false);
            }
        };

        if (storeId) {
            console.log('Store ID is set, fetching QR code URL...');
            fetchQrCodeUrl(storeId);
        } else {
            console.log('Store ID is not set yet.');
        }
    }, [storeId, navigate]);

    if (loading) {
        return <p>Loading QR code...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold mb-2">{storeName}</h1>
        <h2 className="text-lg font-medium text-gray-600 mb-4">Scan QR Code to Visit Store</h2>
        {qrCodeUrl ? (
          <div className="flex flex-col items-center">
            <QRCode id="qrcode-canvas" value={qrCodeUrl} size={256} className="mb-4 border-2 p-2 border-gray-300 rounded-lg" />
  
            <button onClick={downloadQRCode} className="flex items-center text-gray-600 hover:text-gray-800">
              <FiDownload className="mr-1" /> Download QR Code
            </button>
            <p className="text-gray-600">Scan the QR code with your device to visit the store page.</p>
          </div>
        ) : (
          <p className="text-gray-600">QR code not available</p>
        )}
      </div>
    );
};

export default QRCodeGenerator;
