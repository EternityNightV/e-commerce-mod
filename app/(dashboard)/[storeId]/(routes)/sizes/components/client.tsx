'use client'

import { useParams, useRouter } from "next/navigation"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { SizeColomn , columns } from "./columns"
import { DataTable } from "@/components/ui/date-table"
import { Apilist } from "@/components/ui/api-list"

interface SizeClientProps {
    data : SizeColomn[]
}

export const SizeClient = ({
    data
} : SizeClientProps) => {

    const router = useRouter();
    const params = useParams();

    return (
    <>
        <div className="flex items-center justify-between">
           <Heading
           title={`Sizes (${data.length})`}
           description="Manage sizes for your store"
           />
           <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
            <Plus className="mr-2 h-4 w-4"/>
            Add new
           </Button>
        </div>
        <Separator/>
        <DataTable searchKey="name" columns={columns} data={data}/>
        <Heading title="API" description="API calls for sizes"/>
        <Separator/>
        <Apilist entityName="sizes" entityIdName="sizeId"/>
    </>
    )
}