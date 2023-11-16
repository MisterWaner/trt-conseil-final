import { FaHeartCirclePlus, FaShare } from "react-icons/fa6";
import { Offer } from "../../lib/types/types";

interface OfferCardProps {
    offer: Offer;
    applyToOffer: (offerReference: string) => void;
}

export const OfferCard = ({offer, applyToOffer} : OfferCardProps) => {

    return (
        <div className="bg-white w-[250px] md:w-[300px] p-6 rounded-md border-2 border-stone-300 transition duration-200 hover:scale-[1.05]">
            <div className="flex flex-col">
                <div className="flex flex-col justify-between mb-2">
                    <p className="font-semibold">{offer.title}</p>
                    <p className="text-stone-300 font-semibold">{offer.reference}</p>
                </div>
                <div className="text-sm mb-3">
                    <p>{offer.salary} €</p>
                    <p>{offer.schedules}</p>
                    <p>{offer.place}</p>
                    <p>{offer.contractType}</p>
                </div>
                <div className="text-sm">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Possimus qui amet totam quidem voluptatum similique ut adipisci
                    quisquam! Natus architecto alias aliquid tenetur, inventore
                    obcaecati!
                </div>
                <div className="flex flex-col mb-2 w-full">
                    <button onClick={() => applyToOffer(offer.reference)} className="flex justify-center w-full mt-2 border border-black px-3 py-1 bg-black rounded-md font-bold text-white custom-btn cursor-pointer">
                        Postuler
                    </button>
                    <button className="flex justify-center w-full mt-2 border border-black px-3 py-1 bg-black rounded-md font-bold text-white custom-btn cursor-pointer">
                        En savoir +
                    </button>
                </div>
                <div className="flex justify-around gap-2">
                    <button className="flex justify-center items-center w-full mt-2 border border-black px-3 py-1 bg-black rounded-md font-bold text-white custom-btn cursor-pointer">
                        <FaHeartCirclePlus className="mr-2 w-9" />
                    </button>
                    <button className="flex justify-center items-center w-full mt-2 border border-black px-3 py-1 bg-black rounded-md font-bold text-white custom-btn cursor-pointer">
                        <FaShare className="mr-2 w-9" />
                    </button>
                </div>
            </div>
        </div>
    );
};
