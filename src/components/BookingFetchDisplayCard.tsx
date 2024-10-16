// import { useQuery } from "react-query";
import { HotelType } from "../api-client";
//import * as apiClient from '../api-client'
import { FaLocationPin } from "react-icons/fa6";


type Props = {
    hotel : HotelType
}

const BookingFetchDisplayCard = ({hotel} : Props) => {


    const color = (status : string) => status === 'placed' ? 'bg-yellow-500' : status === 'paid' ? 'bg-green-500' : 'bg-red-500'


    const refactorDate = (date : string) => date.split('T')[0]


  return (
    <div className='flex flex-col gap-2 p-4 border border-slate-300'>


                <div className='text-2xl font-bold'>

                {hotel.name}

                </div>

                <div className='flex flex-row'>

                    <span>
                        <FaLocationPin className='text-xl text-red-700'/>
                    </span>
                    <span>
                        {hotel.city},{hotel.country}
                    </span>

                </div>


                <div className='grid grid-cols-1 md:grid-cols-[1fr_2fr]'>            

                            <div>
                                    <img src={hotel.imageUrls[0]} alt='Hotel Image' className='object-fit h-[400px] object-cover' />
                            </div>

                            <div>

                                <div className='border-b  border-b-slate-500 w-full text-xl font-semibold over'>Bookings</div>

                                <div className='h-[500px] overflow-y-auto'>

                                        {hotel.bookings?.map((booking) => (
                                        <div key={booking.id} className='grid grid-flow-row py-3 border-b border-b-slate-300'>


                                                <div>
                                                    Booking ID : {booking.id}
                                                </div>

                                                <div>
                                                    Check-In Date : {booking.checkInDate && refactorDate(booking.checkInDate)}
                                                </div>

                                                <div>
                                                    Check-Out Date : {booking.checkOutDate && refactorDate(booking.checkOutDate)}
                                                </div>

                                                <div>
                                                    Status : <span className={`${color(booking.status)} p-1 w-fit text-white rounded-sm shadow-sm`}>{booking.status}</span>
                                                </div>


                                        </div>
                                        ))}

                                    
                                </div>

                            

                            </div>
                        

                </div>


                


    </div>
  )
}

export default BookingFetchDisplayCard