import { useQuery } from 'react-query'
import * as apiClient from '../api-client'


import Homecard from '../components/Homecard';

const Home = () => {

  const {data : hotels, isError} = useQuery('fetchAllHotels',apiClient.fetchAllHotels)

  if(isError || !hotels){

    return <>
    
    </>
  }


  return (
   
    <div className='p-4'>
        <h2 className='font-bold text-2xl md:text-3xl mb-2'>Featured Hotels</h2>

        <div className='flex flex-col gap-5'>

          {hotels.map((hotel,index) => (

               <Homecard hotel={hotel} favorite={index !== 0}/>
          ))}


        </div>
    </div>
  )

}

export default Home