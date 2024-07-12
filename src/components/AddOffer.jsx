import React , {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CiCalendar } from "react-icons/ci";

export const AddOffer = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
  return (
    <div className="bg-white px-4 py-6 m-2 rounded-lg w-[500px] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 border-3">
      <div className="text-xl font-medium mb-12 text-gray-700">Create Offer</div>

      <form action="">
        <div>
          <label
            htmlFor="offer_heading"
            className="text-normal font-medium leading-6 text-gray-900 block my-2"
          >
            Heading
          </label>
          <input
            type="text"
            name="offer_heading"
            id="offer_heading"
            className="bg-white w-full border-2 border-gray-300 rounded-lg py-2.5 px-3.5 text-gray-900 placeholder:text-gray-400  outline-none"
            placeholder="Enter Offer Heading"
          />
        </div>

        <div>
          <label
            htmlFor="offer_discount"
            className="text-normal font-medium leading-6 text-gray-900 block my-2"
          >
            Discount
          </label>
          <input
            type="text"
            name="offer_discount"
            id="offer_discount"
            className="bg-white border-2 w-full border-gray-300 rounded-lg py-2.5 px-3.5 text-gray-900 placeholder:text-gray-400  outline-none"
            placeholder="Enter Offer Discount"
          />
        </div>
        <div className="my-2 flex justify-between">
      <div className="w-full">
        <label
          htmlFor="start_date"
          className="text-normal font-medium leading-6 text-gray-900 block my-2"
        >
          Start Date
        </label>
        <div >
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            className="bg-white border-2 w-full border-gray-300 rounded-lg py-2.5 px-3.5 text-gray-900 placeholder:text-gray-400 outline-none"
            placeholderText="Select Start Date"
          />
        </div>
      </div>
      <div className="w-full ml-4">
        <label
          htmlFor="end_date"
          className="text-normal font-medium leading-6 text-gray-900 block my-2"
        >
          End Date
        </label>
        <div >
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="dd/MM/yyyy"
            className="bg-white border-2 w-full border-gray-300 rounded-lg py-2.5 px-3.5 text-gray-900 placeholder:text-gray-400 outline-none"
            placeholderText="Select End Date"
          />
        </div>
      </div>
    </div>


        <div className="mt-16 flex justify-between items-center gap-2">
        <button className="px-2 py-2.5 border-2 w-full rounded-md hover:bg-red-700 hover:text-white hover:border-red-700">
            Discard
          </button>
        <button
            className="px-4 py-2.5 border-2 w-full rounded-md bg-blue-700 text-white border-blue-700"
            type="submit"
          >
            Save
          </button>


        </div>
      </form>
    </div>
  );
};
