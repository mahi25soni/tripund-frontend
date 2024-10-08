import React from 'react'

export const OverallInventory = () => {
    return (
        <div className="bg-white p-4 mb-2 rounded-lg flex-none">
          <div className="text-xl font-medium mb-3">Overall Inventory</div>
    
          <div className="flex justify-between">
            <div className="w-1/2 px-10 py-3">
              <div className="font-semibold  text-sky-700 mb-2 text-base" >Catergories</div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-2">
                  <p className="font-semibold text-base">14</p>
                  <p className="font-normal text-gray-400 text-sm">Last 7 Days</p>
                </div>
              </div>
            </div>
            <div className="w-1/2 px-10 py-3 border-l-2 ">
              <div className="font-semibold  text-orange-700 mb-2 text-base">
                Total Products
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-2">
                  <p  className="font-semibold text-base">868</p>
                  <p className="font-normal text-gray-400 text-sm">Last 7 Days</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p  className="font-semibold text-base">25000</p>
                  <p className="font-normal text-gray-400 text-sm">Revenue</p>
                </div>
              </div>
            </div>
            <div className="w-1/2 px-10 py-3 border-l-2 ">
              <div className="font-semibold  text-violet-700 mb-2 text-base">Top Selling</div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-2">
                  <p  className="font-semibold text-base">5</p>
                  <p className="font-normal text-gray-400 text-sm">Last 7 Days</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-semibold text-base">25000</p>
                  <p className="font-normal text-gray-400 text-sm">Cost</p>
                </div>
              </div>
            </div>
            <div className="w-1/2 px-10 py-3 border-l-2 ">
              <div className="font-semibold  text-red-700 mb-2 text-base">Low Stocks</div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-2">
                  <p className="font-semibold text-base">12</p>
                  <p className="font-normal text-gray-400 text-sm">Ordered</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-semibold text-base">2</p>
                  <p className="font-normal text-gray-400 text-sm">Not in stock</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}
