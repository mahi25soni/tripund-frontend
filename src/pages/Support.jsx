// src/components/SupportPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import wb from '../assets/wb.png';
import email from '../assets/email.png';

const SupportPage = () => {
  const navigate = useNavigate();
  const companyInfo = {
    name: 'Tripund Store',
    address: '1234 Street Name, City, Country',
    email: 'support@tripundstore.com',
    phone: '+1 234 567 890',
  };

  const whatsappMessage = encodeURIComponent('Hello, I need support with...');
  const whatsappNumber = '9608810232'; 
  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
  };

  return (
    <div className="p-4  mx-auto">
    <div className="mb-6 bg-white p-12">
        {/* <h2 className="text-xl font-semibold mb-2">Company Information</h2> */}
        <p><strong>Name:</strong> {companyInfo.name}</p>
        <p><strong>Address:</strong> {companyInfo.address}</p>
        <p><strong>Email:</strong> <a href={`mailto:${companyInfo.email}`} className="text-blue-500">{companyInfo.email}</a></p>
        <p><strong>Phone:</strong> <a href={`tel:${companyInfo.phone}`} className="text-blue-500">{companyInfo.phone}</a></p>
      </div>
    <div className='flex gap-4'>
    <div className='w-1/2 bg-white p-4'>
      <div>
      <div className='w-1/5 m-auto'>
        <img className='object-cover' src={email}/>
      </div>
        <p className='text-xl w-2/5 text-gray-500 m-auto text-center'>Request for support via Email </p>
      </div>
      <div
        className="px-4 py-2 mt-4 w-2/5 m-auto text-center bg-blue-500 text-lg text-white rounded shadow hover:bg-green-600"
      >
        <a href={`mailto:${companyInfo.email}`} className="text-white">Mail Us</a>
      </div>
      </div>

      <div className='w-1/2 bg-white p-4'>
      <div>
      <div className='w-1/5 m-auto'>
        <img className='object-cover' src={wb}/>
      </div>
        <p className='text-xl w-2/5 text-gray-500 m-auto text-center'>Request for support directly via Whatsapp</p>
      </div>
      <div
        onClick={handleWhatsAppClick}
        className="px-4 py-2 mt-4 w-2/5 m-auto text-center bg-green-500 text-lg text-white rounded shadow hover:bg-green-600"
      >
        Chat
      </div>
      </div>
      </div>
    </div>
  );
};

export default SupportPage;
