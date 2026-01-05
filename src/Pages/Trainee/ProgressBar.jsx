const ProgressBar = ({ value }) => {
  return (
    <div className="w-full bg-orange-100 rounded-full h-2">
      <div
        className="bg-orange-500 h-2 rounded-full transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

export default ProgressBar;
