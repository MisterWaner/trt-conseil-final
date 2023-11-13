import { Link } from "react-router-dom";
import PublicWrapper from "../../../components/Wrapper/PublicWrapper";

function Home() {
    return (
        <PublicWrapper>
            <div className="grid grid-rows-2 p-2">
                <div className="text-center">
                    <h1 className="w-full text-4xl white-shadow pacifico">
                        TRT Conseil
                    </h1>
                </div>
                <div className="text-center">
                    <p className="white-shadow font-bold text-2xl">
                        Votre avenir entre de bonnes mains.
                    </p>
                </div>
            </div>

            <div className="grid grid-rows-1 grid-cols-2 gap-2 w-full p-2">
                <div className="flex justify-center items-center w-full border border-black px-3 py-1 bg-black rounded-md font-bold text-white custom-btn">
                    <Link to="#" className="w-full text-center">
                        Nous découvrir
                    </Link>
                </div>
                <div className="flex justify-center items-center w-full border border-black px-3 py-1 bg-black rounded-md font-bold text-white custom-btn">
                    <Link to="/register" className="w-full text-center">
                        Créer mon compte
                    </Link>
                </div>
            </div>
        </PublicWrapper>
    );
}

export default Home;
