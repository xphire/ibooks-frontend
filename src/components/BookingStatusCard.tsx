import { useQuery } from "react-query"
import { BookingFetchResponse, verifyBooking } from "../api-client"


type Props = {

    booking : BookingFetchResponse
}

const BookingStatusCard = ({booking} : Props) => {


    const refactorDate = (date : string) => date.split('T')[0]

    const color = (status : string) => status === 'placed' ? 'bg-yellow-500' : status === 'paid' ? 'bg-green-500' : 'bg-red-500'


    useQuery(`verifyBooking-${booking.id}`,() => verifyBooking(booking.id),{

        enabled : booking.status === 'placed'
    })


  return (

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
  )
}

export default BookingStatusCard