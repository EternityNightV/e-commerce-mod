import prismadb from "@/lib/db";

import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";

import { Navbar } from "@/components/navbar";

export default async function DashBoardLayout ({
    children,
    params
} : {
    children : React.ReactNode,
    params : { storedId : string}
}) {
    const { userId } = auth();

    if(!userId) {
        redirect('/sign-in')
    }
    const store = await prismadb.store.findFirst({
        where : {
            id : params.storedId,
            userId
        }
    });

    if(!store) {
        redirect('/')
    }

    return (

        <>
          <Navbar/>
          {children}
        </>
    )
}