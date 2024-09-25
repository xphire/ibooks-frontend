import { Link } from "react-router-dom"
import * as apiClient from '../api-client'
import { useQuery } from "react-query"
import { BsBuilding, BsMap } from "react-icons/bs"
import { BiHotel, BiMoney, BiStar } from "react-icons/bi"
import { useAppContext } from "../contexts/AppContext"

const MyHotels = () => {

  const {showToast} = useAppContext()
  
  const {data : hotelData} = useQuery('fetchMyHotels',apiClient.fetchUserHotels,{
       
    onError: () => {

     showToast({message : 'Error Fetching Hotels', type : 'ERROR'})

    }
  })


  return (
    <div className='space-y-5'>
        <span className='flex justify-between'>
            <h1 className='text-3xl font-bold'>My Hotels</h1>
            <Link to= '/add-hotel' className='flex w-max bg-blue-600 text-white text-xl font-bold rounded-lg p-2 hover:bg-blue-500'>Add Hotel</Link>
        </span>
        <div className='grid grid-cols gap-4 md:gap-8'>

          {!hotelData && <span>No Hotels Found</span>}

          {hotelData &&  hotelData.map((hotel, index) => (

              <div className='flex flex-col justify-between border border-slate-300 rounded-lg p-4 gap-5' key={index}>

                <h2 className='text-2xl font-bold'>{hotel.name}</h2>
                <div className='whitespace-pre-line'>{hotel.description}</div>
                <div className='grid grid-flow-row gap-2 md:grid-flow-col md:grid-cols-5'>

                    <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                         <BsMap className='mr-1'/>
                         {hotel.city} , {hotel.country}
                    </div>
                    <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                         <BsBuilding className='mr-1'/>
                         {hotel.type}
                    </div>
                    <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                         <BiMoney className='mr-1'/>
                         ${hotel.pricePerNight} per night
                    </div>
                    <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                         <BiHotel className='mr-1'/>
                         {hotel.adultCount} adults,{hotel.childCount} children
                    </div>
                    <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                         <BiStar className='mr-1'/>
                         {hotel.starRating}
                    </div>
                </div>


                <div className='flex justify-end mr-5'>

                <Link to={`/edit-hotel/${hotel.id}`} className='bg-blue-600 p-3 font-weight-bold rounded-md text-white hover:bg-blue-400'>
                      View Details
                </Link>

                </div>

              </div>


           ))}

        </div>
    </div>
  )
}

export default MyHotels