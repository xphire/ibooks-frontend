import { Link } from 'react-router-dom'
import { useAppContext } from '../contexts/AppContext'
import SignOutButton from './SignOutButton'
import { GrMenu } from "react-icons/gr";
import { useState } from 'react';

const MobileNavBar = () => {

    const {isLoggedIn} = useAppContext()
    const [openMobileNav, setOpenMobileNav] = useState<boolean>(false)

    const onMenuClick = () => {

        const prev = openMobileNav
  
        setOpenMobileNav(!prev)
  
        return
    }


  return (
        
    <div className='bg-blue-800 py-6 px-3 -mb-0.5 flex flex-col md:hidden'>
                  
            <div className='flex justify-between'>

                <span className='text-3xl text-white font-bold tracking-tight'>
                        <Link to='/'>
                        i-Holidays.com
                        </Link>
                </span>

                {!isLoggedIn && 
                <span>
                    <Link to='/sign-in' className='flex bg-white items-center text-blue-600 px-3 py-2 font-bold hover:bg-gray-100'>
                            Sign In
                    </Link>
                </span>
                }

                {isLoggedIn && 

                 
                    <GrMenu 
                    className='text-white text-4xl font-extrabold cursor-pointer' 
                    onClick={onMenuClick}
                    />
                
                }

            </div>

            {isLoggedIn && openMobileNav && 
            
            <div className='flex flex-row justify-evenly text-white underline mt-6'>

                <span>
                    <Link to='/my-bookings'>
                    My Bookings
                    </Link>
                </span>

                <span>
                    <Link to='/my-hotels'>
                    My Hotels
                    </Link>
                </span>

                <span>
                    <SignOutButton/>
                </span>

            </div>
            
            }
    </div>
  )
}

export default MobileNavBar