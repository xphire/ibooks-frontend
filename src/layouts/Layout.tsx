//import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Hero from "../components/Hero"
import SearchBar from "../components/SearchBar"

type Props =  {
    children : React.ReactNode
}

const Layout = ({children} : Props) => {

  return (
    <div className="flex flex-col min-h-screen">
        <Header/>
        <Hero/>
        <div className='px-[0.8rem] md:px-0 container mx-auto'><SearchBar/></div>
        <div className="px-[0.8rem] md:px-0 container mx-auto py-10 flex-1">
            {children}
        </div>
        <Footer/>
    </div>
  )
}

export default Layout