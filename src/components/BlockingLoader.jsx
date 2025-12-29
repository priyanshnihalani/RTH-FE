import "../../src/BlockingLoader.css";

const BlockingLoader = () => {
  return (
    <div className="blocker">
      <img src="/logo.png" alt="Loading" className="loader" />
      <p>Please wait…</p>
    </div>
  );
};

export default BlockingLoader;
