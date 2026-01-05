const BatchSkeleton = () => {
  return (
    <div className="relative">
      <div className="absolute flex w-full h-full bg-white/80 items-center justify-center">
        <p className=" w-full text-center text-gray-500">No Data Available</p>
      </div>
      <div
        className="
        bg-white
        rounded-2xl
        p-4 sm:p-5
        shadow

        flex flex-col
        gap-4

        sm:flex-row
        sm:items-center
        sm:justify-between
      "
      >
        {/* LEFT */}
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gray-200 shrink-0" />

          <div className="space-y-2 min-w-0">
            <div className="h-4 w-40 bg-gray-200 rounded" />
            <div className="h-3 w-32 bg-gray-200 rounded" />
          </div>
        </div>

        {/* RIGHT GROUP */}
        <div className="
        flex items-center justify-between
        sm:justify-end
        gap-6
        w-full
        sm:w-auto
      ">
          <div className="h-3 w-28 bg-gray-200 rounded" />
          <div className="h-4 w-20 bg-gray-200 rounded" />
        </div>
      </div>
    </div>

  );
};

export default BatchSkeleton;
