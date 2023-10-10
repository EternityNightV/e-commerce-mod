'use client'

import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { BillboardColomn, columns } from "./columns"
import { Plus } from "lucide-react"

import { useParams, useRouter } from "next/navigation"
import { DataTable } from "@/components/ui/date-table"

interface BillboardClientProps {
    data : BillboardColomn[]
}

export const BillboardClient = ({
    data
} : BillboardClientProps) => {

    const router = useRouter();
    const params = useParams();

    return (
    <>
        <div className="flex items-center justify-between">
           <Heading
           title={`Billboards (${data.length})`}
           description="Manage billboards for your store"
           />
           <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
            <Plus className="mr-2 h-4 w-4"/>
            Add new
           </Button>
        </div>
        <Separator/>
        <DataTable searchKey="label" columns={columns} data={data}/>
    </>
    )
}