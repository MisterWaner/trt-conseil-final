export default function ModifyPasswordForm() {
    return (
        <form action="" className="flex flex-col w-full items-center">
            
            <div className="flex flex-col mb-4 w-4/6">
                <label htmlFor="currentPassword">Mot de passe actuel</label>
                <input
                    type="password"
                    name="currentPassword"
                    id="currentPassword"
                    className="bg-indigo-300/50 focus:ring-indigo-300 p-2 rounded-md focus:outline-none focus:ring"
                />
            </div>
            <div className="flex flex-col mb-4 w-4/6">
                <label htmlFor="newPassword">Mot de passe</label>
                <input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    className="bg-indigo-300/50 focus:ring-indigo-300 p-2 rounded-md focus:outline-none focus:ring"
                />
            </div>
            <div className="flex flex-col mb-4 w-4/6">
                <label htmlFor="confirmation">Confirmation</label>
                <input
                    type="password"
                    name="confirmation"
                    id="confirmation"
                    className="bg-indigo-300/50 focus:ring-indigo-300 p-2 rounded-md focus:outline-none focus:ring"
                />
            </div>
            <div className="flex flex-col mb-4 w-4/6">
                <button
                    type="submit"
                    className="flex justify-center w-full mt-2 border border-black px-3 py-1 bg-black rounded-md font-bold text-white custom-btn cursor-pointer"
                >
                    Valider
                </button>
            </div>
        </form>
    );
}
