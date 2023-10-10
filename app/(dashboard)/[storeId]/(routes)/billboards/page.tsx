import { format } from 'date-fns'
import { BillboardClient } from './components/client'
import prismadb from '@/lib/db'
import { BillboardColomn } from './components/columns'

const BillboardsPage =  async ({
  params
} : { params : { storeId : string }}) => {

  const billboards = await prismadb.billboard.findMany({
    where : {
      storeId : params.storeId
    },
    orderBy : {
      createdAt : 'desc'
    }
  })

  const formatedBillboards : BillboardColomn[] = billboards.map((item) => ({
    id : item.id,
    label : item.label,
    createdAt : format(item.createdAt, 'MMMM do, yyyy')
  }))
  return (
    <div>
      <div className='flex-col space-y-4 p-8 pt-6'>
        <BillboardClient data={formatedBillboards}/>
      </div>
    </div>
  )
}

export default BillboardsPage
