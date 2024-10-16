import React, { useContext, useEffect, useState } from "react";

type SearchContext = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  hotelId: string;
  numberOfNights : number;
  saveSearchValues: (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
    hotelId?: string
  ) => void;
};


type Props = {

    children : React.ReactNode
}


const SearchContext = React.createContext<SearchContext | undefined>(undefined)

export const SearchContextProvider =  ({children} : Props) => {


    const [destination, setDestination] = useState<string>(() => sessionStorage.getItem('destination') || '')
    const [checkIn, setCheckIn] = useState<Date>(() => new Date(sessionStorage.getItem('checkIn') || new Date().toISOString()))
    const [checkOut, setCheckOut] = useState<Date>(() => new Date(sessionStorage.getItem('checkOut') || new Date().toISOString()))
    const [adultCount, setAdultCount] = useState<number>(() => parseInt(sessionStorage.getItem('adultCount') || '1'))
    const [childCount, setChildCount] = useState<number>(() => parseInt(sessionStorage.getItem('adultCount') || '0'))
    const [hotelId, setHotelId] = useState<string>(() => sessionStorage.getItem('hotelId') || '')
    const [numberOfNights , setNumberOfNights] = useState<number>(0)


    const saveSearchValues = ( 
        destination: string,
        checkIn: Date,
        checkOut: Date,
        adultCount: number,
        childCount: number,
        hotelId? : string) => {


            setDestination(destination)
            setCheckIn(checkIn)
            setCheckOut(checkOut)
            setAdultCount(adultCount)
            setChildCount(childCount)

            if (hotelId){
                setHotelId(hotelId)
                sessionStorage.setItem('hotelId',hotelId)
            }

            sessionStorage.setItem('destination', destination)
            sessionStorage.setItem('checkIn', checkIn.toISOString())
            sessionStorage.setItem('checkOut', checkOut.toISOString())
            sessionStorage.setItem('adultCount', adultCount.toString())
            sessionStorage.setItem('childCount', childCount.toString())
            


    }


    useEffect(() => {

        if(checkIn && checkOut){
  
            const nights = Math.abs((checkOut.getTime() - checkIn.getTime())/(1000 * 60 * 60 * 24))
  
  
            setNumberOfNights(Math.ceil(nights))
        }
    }, [checkIn,checkOut])
    


    return (

        <SearchContext.Provider value={{destination, checkIn, checkOut, adultCount, childCount, hotelId, numberOfNights,  saveSearchValues }}>

            {children}
        
        </SearchContext.Provider>

    )


}

// eslint-disable-next-line react-refresh/only-export-components
export const useSearchContext = () => {

    const context = useContext(SearchContext)

    return context as SearchContext
}
