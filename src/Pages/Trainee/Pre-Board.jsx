import { useState } from "react";
import PreBoardHeader from "./Pre-BoardHeader";
import PreBoardGrid from "./Pre-BoardGrid";
import PreBoardContent from "./Pre-BoardContent";
import modules from "./modules";

const PreBoard = () => {
  const [activeModule, setActiveModule] = useState(modules[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 p-6">
      <PreBoardHeader />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PreBoardGrid
          modules={modules}
          onSelect={setActiveModule}
          activeId={activeModule.id}
        />

        <PreBoardContent module={activeModule} />
      </div>
    </div>
  );
};

export default PreBoard;
