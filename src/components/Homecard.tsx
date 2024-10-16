import { HomeHotelsResponse } from "../api-client"
import { Link } from 'react-router-dom'
import { MdLocationOn } from "react-icons/md";
import { FaStar } from "react-icons/fa6";

type Props = {
    hotel : HomeHotelsResponse,
    favorite : boolean
}


const Homecard = ({hotel, favorite} : Props) => {


  return (


    <div className='border-2 border-gray-400 rounded-lg'>

    <div>
        <Link to = {`/detail/${hotel.id}`} className='relative'>

        <p className='absolute mt-1 ml-2 p-3 shadow-2xl text-white rounded-full top-[30%] bg-gray-500 opacity-50' hidden={favorite}> &#128293; Most Booked</p>
         <img src={hotel.imageUrls[0]} alt='Hotel image' className='object-cover object-center overflow-hidden h-[300px] w-full rounded-lg' />

         <div className='absolute bottom-0 p-6 bg-black opacity-50 w-full flex flex-col text-white'>

            <div className='text-2xl md:text-3xl font-bold'>
                   {hotel.name}
            </div>
            <div className='flex flex-col md:flex-row justify-between'>
                    <div className='flex'>

                    <span><MdLocationOn className='mt-1 text-red-600' /></span>
                    <span>{hotel.city}, {hotel.country}</span>

                    </div>
                    <div className='flex'>

                        <FaStar className='mt-1 mr-1'/> {`${hotel.starRating}.0`}

                    </div>
                    
            </div>

         </div>
        
        </Link>
       

    </div>
   
   
</div>

    
  )


}

export default Homecard