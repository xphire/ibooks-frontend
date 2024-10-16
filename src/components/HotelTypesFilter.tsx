import { hotelTypes } from "../config/hotel-options-config";

type Props = {

    selectedHotelTypes : string[];
    onChange : (event : React.ChangeEvent<HTMLInputElement>) => void

}

const HotelTypesFilter = ({selectedHotelTypes, onChange} : Props) => {


  return (
    <div className='border-b border-slate-300 pb-5'>
        <h4 className='text-md font-semibold mb-2'>Hotel Type</h4>
        {hotelTypes.map((type) => (

           <label className='flex items-center space'>
             <input 
               type='checkbox' 
               className='rounded' 
               value={type} 
               checked={selectedHotelTypes.includes(type)}
               onChange={onChange}
             />
             <span>{type}</span>
           </label>

        ))}
    </div>
  )
}

export default HotelTypesFilter