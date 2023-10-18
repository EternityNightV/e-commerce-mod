'use client'

import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/date-table"

import { OrderColomn, columns } from "./columns"

interface OrderClientProps {
    data : OrderColomn[]
}

export const OrderClient = ({
    data
} : OrderClientProps) => {

    return (
    <>
        <Heading
           title={`Orders (${data.length})`}
           description="Manage orders for your store"
        />
        <Separator/>
        <DataTable searchKey="products" columns={columns} data={data}/>
    </>
    )
}