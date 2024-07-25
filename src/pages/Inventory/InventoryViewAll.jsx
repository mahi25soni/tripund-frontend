import React from 'react'
import { OverallInventory } from '../../components/OverallInventory'
import { InventoryCatelogue } from '../../components/InventoryCatelogue'

export const InventoryViewAll = () => {
  return (
    <div className='h-screen flex flex-col gap-5'>
        <OverallInventory></OverallInventory>
        <InventoryCatelogue></InventoryCatelogue>
    </div>
  )
}
