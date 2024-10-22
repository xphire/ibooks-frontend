import { useForm } from "react-hook-form"
import { User } from "../../api-client"
import { useSearchContext } from "../../contexts/SearchContext"
import * as apiClient from '../../api-client'
import { useMutation } from "react-query"
import { useAppContext } from "../../contexts/AppContext"
import { useEffect } from "react"



type Props = {
    currentUser : User;
   // numberOfNights : number;
    hotelId : string
}

export type BookingFormData = {
    firstName : string;
    lastName : string;
    hotelId : string;
    adultCount : number;
    childCount : number;
    checkInDate : Date;
    checkOutDate : Date;
    numberOfNights : number
    
}

const BookingForm = ({currentUser , hotelId}: Props) => {


    const search = useSearchContext()

    const {showToast} = useAppContext()


    const {mutate : bookRoom, isLoading ,data } = useMutation(apiClient.createBooking, {


        onSuccess: () => {

            showToast({message : 'Booking Initiated', type : 'SUCCESS'})
            console.log(data)
            // window.location.replace(data?.url as string)
            


        },
        onError: () => {

            showToast({message : 'Error Booking Hotel', type : 'ERROR'})
            
        }


    })


    const {handleSubmit} = useForm<BookingFormData>({
        defaultValues : {
            hotelId : hotelId,
            adultCount : search.adultCount,
            childCount : search.childCount,
            checkInDate : search.checkIn,
            checkOutDate : search.checkOut,
            numberOfNights : search.numberOfNights
        }
    })


    const onSubmit = handleSubmit((formData : BookingFormData) => {

          bookRoom(formData)
        
    })


    useEffect(() => {

        if(data?.url){

            window.location.replace(data?.url)
        }

    },[data])


  return (
    <form 
      className='grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5'
      onSubmit={onSubmit}
    >

        <span className='text-3xl font-bold'>Confirm Your Details</span>
        <div className='grid grid-cols-2 gap-6'>
            <label className='text-gray-700 text-sm font-bold flex-1'>
                First Name
                <input 
                  className='mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal' 
                  type='text' 
                  readOnly 
                  disabled
                  value={currentUser.firstName}
                />
            </label>
            <label className='text-gray-700 text-sm font-bold flex-1'>
                Last Name
                <input 
                  className='mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal' 
                  type='text' 
                  readOnly 
                  disabled 
                  value={currentUser.lastName}
                />
            </label>
            <label className='text-gray-700 text-sm font-bold flex-1'>
                Email
                <input 
                
                    className='mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal' 
                    type='text' 
                    readOnly 
                    disabled
                    value={currentUser.email}   
                />
            </label>
        </div>

        <button type='submit' className='bg-blue-600 text-white p-2 rounded-lg font-bold hover:bg-blue-500 text-xl cursor-pointer disabled:bg-gray-500' disabled={isLoading}>
              {isLoading ? 'Booking...' : 'Confirm Booking'}
          </button>

    </form>
  )

}

export default BookingForm