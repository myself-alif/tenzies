export default function Dice({ value, isHeld, id, hold }) {
  return (
    <button
      className="dice"
      style={{ backgroundColor: isHeld ? "#59E391" : "white" }}
      onClick={() => {
        hold(id);
      }}
    >
      {value}
    </button>
  );
}
