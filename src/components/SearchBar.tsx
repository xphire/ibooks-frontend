import { FormEvent, useState } from "react"
import { useSearchContext } from "../contexts/SearchContext"
import { MdTravelExplore } from "react-icons/md"
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate } from "react-router-dom"

const SearchBar = () => {

    const search = useSearchContext()

    const navigate = useNavigate()

    const [destination, setDestination] = useState<string>(search.destination)
    const [checkIn, setCheckIn] = useState<Date>(search.checkIn)
    const [checkOut, setCheckOut] = useState<Date>(search.checkOut)
    const [adultCount, setAdultCount] = useState<number>(search.adultCount)
    const [childCount, setChildCount] = useState<number>(search.childCount)


    const handleSubmit = (event : FormEvent) => {

        event.preventDefault()

        search.saveSearchValues(destination, checkIn,checkOut,adultCount, childCount)

        navigate('/search')

    }

    const minDate = new Date()
    const maxDate = new Date()
    maxDate.setFullYear(maxDate.getFullYear() + 1)

    
  return (
    <form onSubmit={handleSubmit} className='-mt-8 p-3 bg-orange-400 rounded shadow-md grid-cols-1 grid md:grid-cols-3 items-center gap-5'>


        <div className='flex bg-white p-2'>

            <MdTravelExplore size={25} className='mr-1'/>
            <input 
            placeholder='where are you going?' 
            name="destination"
            className='text-sm w-full focus:outline-none' 
            value={destination}
            onChange={(event) => setDestination(event.target.value) } />

        </div>


        <div className='flex bg-white px-1 py-1 gap-1'>
            <label className='items-center flex'>
                Adults:
            </label>
            <input 
            className='w-full p-1 focus:outline-none font-bold
            '
            type='number'
            min={1}
            max={20}
            value={adultCount}
            onChange={(event) => setAdultCount(parseInt(event.target.value))}
            />
             <label className='items-center flex'>
                Children:
            </label>
            <input 
            className='w-full p-1 focus:outline-none font-bold
            '
            type='number'
            min={0}
            max={20}
            value={childCount}
            onChange={(event) => setChildCount(parseInt(event.target.value))}
            />

        </div>

        <div>


            <DatePicker 
            selected={checkIn}
            onChange={date => setCheckIn(date as Date)}
            selectsStart
            name="checkIn"
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            isClearable
            placeholderText='Check-in Date'
            className='min-w-full bg-white p-2 focus:outline-none'
            wrapperClassName='min-w-full'
            />


        

            

        </div>

        <div>

            <DatePicker 
            selected={checkOut}
            onChange={date => setCheckOut(date as Date)}
            name="checkOut"
            selectsStart
            isClearable
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText='Check-out Date'
            className='min-w-full bg-white p-2 focus:outline-none'
            wrapperClassName='min-w-full'
            />

        </div>


        <div className='flex gap-1'>

            <button className='w-2/3 bg-blue-600 text-white h-full p-2 font-bold text-xl hover:bg-blue-500' disabled={!checkIn || !checkOut}>
                  Search
            </button>
            <button className='w-1/3 bg-red-600 text-white h-full p-2 font-bold text-xl hover:bg-red-500'>
                  Clear
            </button>

        </div>



    </form>
  )
}

export default SearchBar