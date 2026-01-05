const StudentCardSkeleton = () => {
    return (
        <div className="relative cursor-not-allowed">

            {/* OVERLAY TEXT */}
            <div className="absolute inset-0 z-10 flex items-center justify-center">
                <p className="flex justify-center items-center w-full text-center h-full self-center  text-gray-400 text-sm font-medium bg-white/70 px-4 py-2 rounded-lg">
                    No Data Available
                </p>
            </div>

            {/* SKELETON CARD */}
            <div className="bg-white rounded-2xl p-5 shadow space-y-4">
                <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-3 w-1/2 bg-gray-200 rounded"></div>

                <div className="flex justify-between items-center">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-2">
                            <div className="h-3 w-16 bg-gray-200 rounded"></div>
                            <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                        </div>
                    ))}
                </div>

                <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </div>

        </div>

    );
};

export default StudentCardSkeleton;
