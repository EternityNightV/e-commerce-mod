'use client'

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { UserButton } from "@clerk/nextjs";


const SetupPage = () => {
  return (
   <div className="p-4">
    <Modal
    isOpen={true}
    onClose={()=> {}}
    title="test"
    description="test"
    >
      ##Ff3
    </Modal>
   </div>
  )
}
export default SetupPage
