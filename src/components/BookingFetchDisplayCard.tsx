// import { useQuery } from "react-query";
import { HotelType } from "../api-client";
//import * as apiClient from '../api-client'
import { FaLocationPin } from "react-icons/fa6";
import BookingStatusCard from "./BookingStatusCard";


type Props = {
    hotel : HotelType
}

const BookingFetchDisplayCard = ({hotel} : Props) => {


    if(!hotel){

        return <>
        </>
    }



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

                                    {hotel.bookings && hotel.bookings.map((booking) => (

                                        <BookingStatusCard booking={booking} key={booking.id}/>
                                    )


                                    )}

                                    
                                </div>

                            

                            </div>
                        

                </div>


                


    </div>
  )
}

export default BookingFetchDisplayCard