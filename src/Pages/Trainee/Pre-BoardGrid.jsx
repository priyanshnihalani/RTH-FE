import PreBoardCard from "./Pre-BoardCard";

const PreBoardGrid = ({ modules, onSelect, activeId }) => {
  return (
    <div className="space-y-4">
      {modules.map((mod) => (
        <PreBoardCard
          key={mod.id}
          module={mod}
          active={mod.id === activeId}
          onClick={() => onSelect(mod)}
        />
      ))}
    </div>
  );
};

export default PreBoardGrid;
