import { HotelType } from "../api-client";
import { useSearchContext } from "../contexts/SearchContext";

type Props = {
    checkIn : Date;
    checkOut : Date;
    adultCount  : number;
    childCount : number;
   // numberOfNights : number;
    hotel : HotelType

}

const BookingDetailsSummary = ({checkIn, checkOut, adultCount, childCount, hotel} : Props) => {


    const search = useSearchContext()


  return (
    <div className='grid gap-4 rounded-lg border border-slate-300 p-5 h-fit'>
        <h2 className='text-xl font-bold'>Your Booking Details</h2>
        <div className='border-b py-2'>
            Location : 
            <div className='font-bold'>{`${hotel.name}, ${hotel.city} , ${hotel.country}`}</div>
            <div className='flex justify-between'>

                <div>
                    Check-in
                    <div className='font-bold'>
                        {checkIn.toDateString()}
                    </div>
                </div>

                <div>
                    Check-out
                    <div className='font-bold'>
                        {checkOut.toDateString()}
                    </div>
                </div>

            </div>
            <div className='border-t border-b py-2'>
                Total length of stay:
                <div className='font-bold'>
                   {search.numberOfNights} night(s)
                </div>

            </div>
            <div>
               Guests
               <div className='font-bold'>
                   {adultCount} adult(s) & {childCount} children
               </div>
            </div>
        </div>
    </div>
  )

}

export default BookingDetailsSummary