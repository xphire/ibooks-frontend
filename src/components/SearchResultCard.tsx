import { AiFillStar } from "react-icons/ai";
import { HotelType } from "../api-client";
import { Link } from "react-router-dom";

type Props = {
  hotel: HotelType;
};

const SearchResultCard = ({ hotel }: Props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-4 gap-3 whitespace-normal px-5">
      <div className="w-full h-[300px]">
        <img
          src={hotel.imageUrls[0]}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="grid grid-rows-[0.5fr_2fr_1fr] gap-3">
        <div>
          <div className="flex items-center">
            <span className="flex">
              {Array.from({
                length: hotel.starRating,
              }).map(() => (
                <AiFillStar className="fill-yellow-400" />
              ))}
            </span>

            <span className="ml-1 text-sm">{hotel.type}</span>
          </div>
          <Link
            to={`/detail/${hotel.id}`}
            className="text-2xl font-bold cursor-pointer"
          >
            {hotel.name}
          </Link>
        </div>

        <div>{hotel.description}</div>

        <div className="flex flex-col">
          <div className="flex gap-2 flex-wrap">
            {hotel.facilities.slice(0, 3).map((facility) => (
              <span className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap max-h-fit">
                {facility}
              </span>
            ))}
            <span className="text-sm whitespace-nowrap text-end">
              {hotel.facilities.length > 3 &&
                `+${hotel.facilities.length - 3} more`}
            </span>
          </div>

          <div className="flex flex-col xl:items-end gap-1">
            <span className="font-bold text-nowrap">${hotel.pricePerNight} per night</span>
            <Link
              to={`/detail/${hotel.id}`}
              className="bg-blue-600 text-white h-full p-1 font-bold text-xl max-w-fit hover:bg-blue-500 rounded-md text-nowrap max-h-fit"
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
