import React from 'react'
import { useSelector } from 'react-redux';

const Completeorder = () => {
    const cart = useSelector((state) => state.product.cart);

    const ddata = cart.map((item) => {
        return <>
            <tr>
                <td className='border'>
                    <img src={item.image} className="" style={{height:'120px'}} alt="Blue Jeans Jacket" />
                </td>
                <td className='border border-rounded'>jsdhcb</td>
                <td className='border border-rounded'>$ {item.price}</td>

            </tr>
        </>
    })
    return (
        <div className='mt-5 pt-5 ' style={{ height: '74.4vh' }}>Completeorder
            <div>
                <table className=' w-50 m-auto text-center '>
                    <thead className='p-3'>
                        <th className='border border-rounded' >Image</th>
                        <th className='border border-rounded'>Quantity</th>
                        <th className='border border-rounded'>Price</th>

                    </thead>
                    <tbody >
                        {ddata}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Completeorder