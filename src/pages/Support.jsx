import React from 'react';
import { useNavigate } from 'react-router-dom';
import wb from '../assets/wb.png';
import email from '../assets/email.png';

const SupportPage = () => {
  const navigate = useNavigate();
  const companyInfo = {
    name: 'Tripund Store',
    address: 'Sector 70, Mohali, India',
    email: 'support@tripundstore.com',
    phone: '',
  };

  const whatsappMessage = encodeURIComponent('Hello, I need support with...');
  const whatsappNumber = '9608810232'; 
  
  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Company Info Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
        <div className="space-y-3 text-gray-600">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <p><span className="font-medium text-gray-700">{companyInfo.name}</span></p>
          </div>
          <div className="flex items-start">
            <svg className="w-5 h-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p>{companyInfo.address}</p>
          </div>
          <div className="flex items-start">
            <svg className="w-5 h-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <a href={`mailto:${companyInfo.email}`} className="text-blue-600 hover:text-blue-800 transition-colors">
              {companyInfo.email}
            </a>
          </div>
        </div>
      </div>

      {/* Support Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <img src={email} alt="Email support" className="w-10 h-10 object-contain" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">Email Support</h3>
            <p className="text-gray-500 mb-6">Send us an email and we'll get back to you within 24 hours</p>
            <a 
              href={`mailto:${companyInfo.email}`} 
              className="w-full max-w-xs px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Send Email
            </a>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-4">
              <img src={wb} alt="WhatsApp support" className="w-10 h-10 object-contain" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">WhatsApp Chat</h3>
            <p className="text-gray-500 mb-6">Get instant support through WhatsApp messaging</p>
            <button
              onClick={handleWhatsAppClick}
              className="w-full max-w-xs px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
            >
              Chat Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;