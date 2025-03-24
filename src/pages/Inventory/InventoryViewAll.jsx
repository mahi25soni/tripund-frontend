import React from "react";
import { OverallInventory } from "../../components/OverallInventory";
import { InventoryCatelogue } from "../../components/InventoryCatelogue";

export const InventoryViewAll = () => {
  return (
    <div className="h-full flex flex-col gap-5 xl:p-4">
      <div className="bg-white rounded-lg xl:p-4">
        <OverallInventory />
      </div>
      <div className="rounded-lg lg:p-4 flex-grow lg:bg-white lg:shadow-lg">
        <InventoryCatelogue />
      </div>
    </div>
  );
};
