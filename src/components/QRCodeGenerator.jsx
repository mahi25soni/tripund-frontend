import React, { useState, useEffect } from 'react';
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
        const link = document.createElement('a');
        link.href = qrCodeUrl;
        link.download = `${storeName}_QRCode.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        const fetchStoreData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const config = { headers: { Authorization: `Bearer ${token}` } };
                    const response = await axios.get('http://localhost:5000/api/store/storeId', config);
                    setStoreId(response.data.store._id);
                    setStoreName(response.data.store.storeName);
                } else {
                    navigate('/login');
                }
            } catch (error) {
                console.error('Failed to fetch store data:', error);
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
                    navigate('/login');
                    return;
                }

                const config = { headers: { Authorization: `Bearer ${token}` } };
                const response = await axios.get(`http://localhost:5000/api/qrcode/generate-qr/${storeId}`, config);
                setQrCodeUrl(response.data.qrCodeUrl);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching QR code:', error);
                setError('Error fetching QR code');
                setLoading(false);
            }
        };

        if (storeId) {
            fetchQrCodeUrl(storeId);
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
            {qrCodeUrl && (
                <div className="flex flex-col items-center">
                    <img src={qrCodeUrl} alt="QR Code" className="mb-4 border-2 p-2 border-gray-300 rounded-lg" />
                    <button onClick={downloadQRCode} className="flex items-center text-gray-600 hover:text-gray-800">
                        <FiDownload className="mr-1" /> Download QR Code
                    </button>
                    <p className="text-gray-600">Scan the QR code with your device to visit the store page.</p>
                </div>
            )}
        </div>
    );
};

export default QRCodeGenerator;
