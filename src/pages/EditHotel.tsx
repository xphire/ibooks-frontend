import { useMutation, useQuery } from 'react-query'
import * as apiClient from '../api-client'

import { useParams } from "react-router-dom"
import ManageHotelForm from '../forms/manageHotelForm/ManageHotelForm'
import { useAppContext } from '../contexts/AppContext'

const EditHotel = () => {


  const {showToast} = useAppContext()

  const {hotelId} = useParams()

  const {data : hotel} = useQuery('fetchHotelById', () => 

    apiClient.fetchHotelById(hotelId || ''),
    {
        enabled : !!hotelId
    }
  )


  const {mutate, isLoading} = useMutation(apiClient.updateHotel, {

    onSuccess: () => {

      showToast({message : 'Hotel Updated', type : 'SUCCESS'})

    },
    onError : () => {

      showToast({message : 'Error Updating Hotel', type : 'ERROR'})
    }
  })

  const handleSave = (hotelFormData : FormData) => {
    mutate(hotelFormData)
  }


  return  <ManageHotelForm hotel={hotel} onSave = {handleSave} isLoading={isLoading}/>

  
}

export default EditHotel


