const VideoPlayer = ({ url }) => {
  return (
    <div>
      <h4 className="font-semibold mb-2">Video Tutorial</h4>
      <iframe
        className="w-full h-64 rounded-xl"
        src={url}
        title="Training Video"
        allowFullScreen
      />
    </div>
  );
};

export default VideoPlayer;
