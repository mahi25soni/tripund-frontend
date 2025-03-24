import React from "react";
import { OverallInventory } from "../../components/OverallInventory";
import { InventoryCatelogue } from "../../components/InventoryCatelogue";

export const InventoryViewAll = () => {
  return (
    <div className="h-full flex flex-col gap-6 xl:p-2">
      <div className="bg-white rounded-lg xl:p-2">
        <OverallInventory />
      </div>
      <div className="rounded-lg lg:p-2 flex-grow lg:bg-white">
        <InventoryCatelogue />
      </div>
    </div>
  );
};
