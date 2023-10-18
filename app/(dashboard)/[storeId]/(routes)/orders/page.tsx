import { format } from 'date-fns'
import { OrderClient } from './components/client'
import prismadb from '@/lib/db'
import { OrderColomn } from './components/columns'
import { formatter } from '@/lib/utils'

const OrdersPage =  async ({
  params
} : { params : { storeId : string }}) => {

  const orders = await prismadb.order.findMany({
    where : {
      storeId : params.storeId
    },
    include : {
      orderItems : {
        include : {
          product : true
        }
      }
    },
    orderBy : {
      createdAt : 'desc'
    }
  })

  const formatedOrders : OrderColomn[] = orders.map((item) => ({
    id : item.id,
    phone : item.phone,
    address : item.address,
    isPaid : item.isPaid,
    products : item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
    totalPrice : formatter.format(item.orderItems.reduce((total, item) => {
      return total + Number(item.product.price)
    }, 0)),
    createdAt : format(item.createdAt, 'MMMM do, yyyy')
  }))
  return (
    <div>
      <div className='flex-col space-y-4 p-8 pt-6'>
        <OrderClient data={formatedOrders}/>
      </div>
    </div>
  )
}

export default OrdersPage
