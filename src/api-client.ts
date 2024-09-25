import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";

export type HotelType = {

    id : number;
    userId : number;
    name : string;
    city: string;
    country: string,
    description : string;
    type: string;
    pricePerNight: number;
    starRating: number;
    facilities: string[];
    imageUrls: string[];
    adultCount: number;
    childCount : number;
    lastUpdated: string


}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async (formData : RegisterFormData ) => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {confirmPassword, ...rest} = formData

    const response = await fetch(`${API_BASE_URL}/api/v1/users/register`, {
        method : 'POST',
        credentials: 'include',
        headers: {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(rest),

    })

    const responseBody = await response.json()

    if (!response.ok){
        throw new Error(responseBody.message)
    }

}

export const validateToken = async () => {

    const response = await fetch(`${API_BASE_URL}/api/v1/auth/validate-token`, {
        credentials : 'include',
    })


    if(!response.ok) throw new Error('Token invalid')

    return response.json()

}

export const signIn = async (formData : SignInFormData) => {

    const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
        method : 'POST',
        credentials : 'include',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(formData)
    })

    const body = await response.json()

    if(!response.ok) throw new Error(body.message)

    return body

}

export const signOut = async () => {

    const response = await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {

        credentials : 'include',
        method : 'POST',
    
    })

    if (!response.ok){
        throw new Error('Error during sign out')
    }


}

export const addHotel = async (hotelFormData : FormData) => {

    const response = await fetch(`${API_BASE_URL}/api/v1/hotels/hotel`, {
        method : 'POST',
        credentials: 'include',
        body: hotelFormData
    })


    if(!response.ok){
        throw new Error('Failed to add hotel')
    }

    return response.json()
}


export const fetchUserHotels = async () : Promise<HotelType[]> => {

    const response = await fetch(`${API_BASE_URL}/api/v1/hotels/user_hotels`, {
        credentials : 'include'

    })

    if(!response.ok){
        throw new Error('Failed to fetch hotels')
    }

    return response.json()
}


export const fetchHotelById = async (hotelId : string) => {

    const response = await fetch(`${API_BASE_URL}/api/v1/hotels/hotel/${hotelId}`,{
        credentials : 'include'
    }
    
    )

    if(!response.ok){
        throw new Error('Error fetching Hotel')
    }

    return response.json()
}

export const updateHotel = async (hotelFormData : FormData) => {


    const response = await fetch(`${API_BASE_URL}/api/v1/hotels/hotel/${hotelFormData.get('id')}`,{
        method : 'PUT',
        body : hotelFormData,
        credentials : 'include'
    });

    if (!response.ok){
        throw new Error('Failed to update hotel')
    }

    return response.json()


}