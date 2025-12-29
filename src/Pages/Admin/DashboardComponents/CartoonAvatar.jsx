const CartoonAvatar = ({ seed, size = 40 }) => {
  return (
    <img
      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}`}
      alt="avatar"
      width={size}
      height={size}
      className="rounded-full"
    />
  );
}
export default CartoonAvatar