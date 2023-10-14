import { format } from 'date-fns'
import { SizeClient } from './components/client'
import prismadb from '@/lib/db'
import { SizeColomn } from './components/columns'

const SizePage =  async ({
  params
} : { params : { storeId : string }}) => {

  const sizes = await prismadb.size.findMany({
    where : {
      storeId : params.storeId
    },
    orderBy : {
      createdAt : 'desc'
    }
  })

  const formatedSizes : SizeColomn[] = sizes.map((item) => ({
    id : item.id,
    name : item.name,
    value : item.value,
    createdAt : format(item.createdAt, 'MMMM do, yyyy')
  }))
  return (
    <div>
      <div className='flex-col space-y-4 p-8 pt-6'>
        <SizeClient data={formatedSizes}/>
      </div>
    </div>
  )
}

export default SizePage
