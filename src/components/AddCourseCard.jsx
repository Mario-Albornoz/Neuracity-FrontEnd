function AddCourseCard(props){

    return(
        <div className="border-2 border-purple-300 bg-violet-200 rounded-2xl mt-5 mb-5 w-9/10 h-60 p-4 grid justify-items-center items-center relative grid-rows-3">
            <div className="bg-white h-10 w-10 rounded-full relative grid justify-items-center items-center row-start-2">
                <div className="bg-gray-800 h-5 w-1/8 rounded-full absolute"></div>
                <div className="bg-gray-800 h-5 w-1/8 rounded-full absolute rotate-90"></div>
            </div>
            <h3 className="text-purple-600 font-medium row-start-3 row-span-1 self-start">Auto generate a plan for next week</h3>
        </div>
    );
}

export default AddCourseCard