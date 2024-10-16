import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";

export type HotelType = {
  id: number;
  userId: number;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageUrls: string[];
  adultCount: number;
  childCount: number;
  lastUpdated: string;
  bookings?: BookingFetchResponse[];
};

export type HotelSearchResult = {
  data: HotelType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async (formData: RegisterFormData) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { confirmPassword, ...rest } = formData;

  const response = await fetch(`${API_BASE_URL}/api/v1/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rest),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) throw new Error("Token invalid");

  return response.json();
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();

  if (!response.ok) throw new Error(body.message);

  return body;
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Error during sign out");
  }
};

export const addHotel = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/hotels/hotel`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to add hotel");
  }

  return response.json();
};

export const fetchUserHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/hotels/user_hotels`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch hotels");
  }

  return response.json();
};

export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/hotels/hotel/${hotelId}`,
    {
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Error fetching Hotel");
  }

  return response.json();
};

export const updateHotel = async (hotelFormData: FormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/hotels/hotel/${hotelFormData.get("id")}`,
    {
      method: "PUT",
      body: hotelFormData,
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update hotel");
  }

  return response.json();
};

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export const searchHotels = async (
  searchParams: SearchParams
): Promise<HotelSearchResult> => {
  const queryParams = new URLSearchParams();
  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkIn", searchParams.checkIn || "");
  queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("childCount", searchParams.childCount || "");
  queryParams.append("page", searchParams.page || "");
  queryParams.append("maxPrice", searchParams.maxPrice || "");
  queryParams.append("sortOption", searchParams.sortOption || "");

  searchParams.facilities?.forEach((facility) =>
    queryParams.append("facilities", facility)
  );
  searchParams.types?.forEach((type) => queryParams.append("types", type));
  searchParams.stars?.forEach((star) => queryParams.append("stars", star));

  const response = await fetch(
    `${API_BASE_URL}/api/v1/hotels/search?${queryParams}`
  );

  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }

  return response.json();
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export const fetchCurrentUser = async (): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/users/user`, {
    credentials: "include",
  });

  if (!response) throw new Error("Error Fetching User");

  return response.json();
};

export type BookingRequest = {
  hotelId: string;
  adultCount: number;
  childCount: number;
  checkInDate: Date;
  checkOutDate: Date;
  numberOfNights: number;
};

export type BookingResponse = {
  reference: string;
  url: string;
};

export type BookingFetchResponse = {
  id: string;
  status: string;
  hotelId: number;
  userId: number;
  totalAmount: number;
  numberOfNights: number;
  adultCount: number;
  childCount: number;
  firstName: string;
  lastName: string;
  checkInDate: string;
  checkOutDate: string;
  email: string;
  lastUpdated: string;
  hotel: HotelType;
};

export const createBooking = async (
  formData: BookingRequest
): Promise<BookingResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/bookings/booking`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Failed to create booking");
  }

  return response.json();
};

export const verifyBooking = async (reference: string) => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/bookings/payments/confirm/paystack/${reference}`,
    {
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("failed to confirm payment");
  }

  return response.json();
};

export const fetchBookings = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/bookings/mybookings`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("failed to fetch bookings");
  }

  return response.json();
};

export const fetchBookingById = async (
  bookingId: string
): Promise<BookingFetchResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/bookings/booking/${bookingId}`,
    {
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("failed to fetch bookings");
  }

  return response.json();
};

export type HomeHotelsResponse = Omit<
  HotelType,
  'userId' | 'bookings' | 'lastUpdated'
> & {
  bookingCount: number;
};

export const fetchAllHotels = async (): Promise<HomeHotelsResponse[]> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/hotels/all`);

  if (!response.ok) {
    throw new Error("failed to fetch hotels");
  }

  return response.json();
};
