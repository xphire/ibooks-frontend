import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import ImagesSection from "./ImagesSection";
import { HotelType } from "../../api-client";
import { useEffect } from "react";

export type HotelFormData = {

    name : string;
    city: string;
    country: string,
    description : string;
    type: string;
    pricePerNight: number;
    starRating: number;
    facilities: string[];
    imageFiles: FileList;
    imageUrls : string[];
    adultCount: number;
    childCount : number;


}



type Props = {
  hotel? : HotelType;
  onSave : (hotelFormData : FormData) => void;
  isLoading : boolean
}

const ManageHotelForm = ({onSave, isLoading, hotel} : Props) => {


  const formMethods = useForm<HotelFormData>()
  const {handleSubmit, reset} = formMethods

  useEffect(() => {
    reset(hotel)
  }, [hotel,reset])

  const onSubmit = handleSubmit((formDataJson : HotelFormData) => {

    //console.log(formData)

    const formData = new FormData()

    if(hotel){
       formData.append('id', hotel.id.toString())
    }

    formData.append('name', formDataJson.name)
    formData.append('city', formDataJson.city)
    formData.append('country', formDataJson.country)
    formData.append('description', formDataJson.description)
    formData.append('type', formDataJson.type)
    formData.append('pricePerNight', String(formDataJson.pricePerNight))
    formData.append('starRating', String(formDataJson.starRating))
    formData.append('adultCount', String(formDataJson.adultCount))
    formData.append('childCount', String(formDataJson.adultCount))


    formDataJson.facilities.forEach(function (facility, index) {
          
      formData.append(`facilities[${index}]`,facility)
       
    })

    if(formDataJson.imageUrls){
        
      formDataJson.imageUrls.forEach((url,index) => {

        formData.append(`imageUrls[${index}]`, url)

      })  
    }

    //FileList type is not an array, we need to convert it, we also do not need to specify index when attaching an image 
    Array.from(formDataJson.imageFiles).forEach((file) => {

         formData.append(`imageFiles`, file)
    })

    onSave(formData)


  })

  return (

    <FormProvider {...formMethods}>

      <form className='flex flex-col gap-10 mx-5' onSubmit={onSubmit}>
        <DetailsSection/>
        <TypeSection/>
        <FacilitiesSection/>
        <GuestSection/>
        <ImagesSection/>
        <span className='flex justify-center md:justify-end'>
          <button type='submit' className='bg-blue-600 text-white p-2 rounded-lg font-bold hover:bg-blue-500 text-xl cursor-pointer disabled:bg-gray-500' disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save'}
          </button>
        </span>
      </form>
      
    </FormProvider>

    

  )
}

export default ManageHotelForm