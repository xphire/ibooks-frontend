const Footer = () => {
  return (
    <div className="bg-blue-800 py-10">
        <div className="px-[0.5rem] md:px-0 container mx-auto flex justify-between items-center">
             <span className="text-xl md:text-3xl text-white font-bold tracking-tight">
             i-Holidays.com
             </span>
             
             <span className="text-white font-bold tracking-tight flex gap-4 text-sm md:text-base">
                   <p className="cursor-pointer">Privacy Policy</p>
                   <p className="cursor-pointer">Terms of Service</p>
             </span>
        </div>
    </div>
       
  )
}

export default Footer