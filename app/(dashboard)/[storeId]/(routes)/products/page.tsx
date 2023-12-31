import { format } from 'date-fns'
import { ProductClient } from './components/client'
import prismadb from '@/lib/db'
import {  ProductColomn } from './components/columns'
import { formatter } from '@/lib/utils'

const ProductsPage =  async ({
  params
} : { params : { storeId : string }}) => {

  const products = await prismadb.product.findMany({
    where : {
      storeId : params.storeId
    },
    include : {
      category : true,
      size : true,
      color : true,
    },
    orderBy : {
      createdAt : 'desc'
    }
  })

  const formatedProducts : ProductColomn[] = products.map((item) => ({
    id : item.id,
    name : item.name,
    isFeatured : item.isFeatured,
    isArchived : item.isArchived,
    price : formatter.format(item.price),
    category : item.category.name,
    size : item.size.name,
    color : item.color.value,
    createdAt : format(item.createdAt, 'MMMM do, yyyy')
  }))
  return (
    <div>
      <div className='flex-col space-y-4 p-8 pt-6'>
        <ProductClient data={formatedProducts}/>
      </div>
    </div>
  )
}

export default ProductsPage
