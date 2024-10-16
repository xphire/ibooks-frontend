import { useQuery } from 'react-query'
import * as apiClient from '../api-client'
import BookingFetchDisplayCard from '../components/BookingFetchDisplayCard'

const MyBookings = () => {


    const {data : hotels,isLoading, isError} = useQuery('fetchUserBookings', () => apiClient.fetchBookings())


    if(isLoading){
        return <span>
            fetching Bookings, please wait...
        </span>
    }

    if (!hotels || isError){

        return <span>
            Failed to fetch bookings, please try again later
        </span>
    }


    if(hotels.length === 0){

         return <span>No Bookings Found</span>
    } 

  return (
    <div className='flex flex-col gap-4'>
        {hotels.map((hotel) => (
             
            <BookingFetchDisplayCard key={hotel.id} hotel={hotel}/>

        ))}
    </div>
  )
}

export default MyBookings