import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import PreBoardHeader from "./Pre-BoardHeader";
import PreBoardGrid from "./Pre-BoardGrid";
import PreBoardContent from "./Pre-BoardContent";
import modulesData from "./modules";
import Cookie from "js-cookie";
import { ApiService } from "../../Services/ApiService";

const COMPLETION_PERCENT = 80;

const PreBoard = () => {
  const [activeModule, setActiveModule] = useState(modulesData[0]);
  const [videoProgressMap, setVideoProgressMap] = useState({});
  const [user, setUser] = useState(null);

  const lastSavedRef = useRef({});
  const accessToken = Cookie.get("accessToken");

  /* ================= LOAD USER + PROGRESS ================= */
  useEffect(() => {
    const loadProgress = async () => {
      const userRes = await ApiService.post(
        "/api/users/auth/me",
        { accessToken }
      );
      setUser(userRes);

      const progressRes = await ApiService.post(
        "/api/preboard/video-progress/all",
        { userId: userRes.id }
      );

      const progressMap = {};
      progressRes.forEach((row) => {
        progressMap[row.module_id] = {
          lastWatchedSecond: row.last_watched_second,
          progress: row.progress,
          completed: row.completed,
        };
      });

      setVideoProgressMap(progressMap);
    };

    loadProgress();
  }, [accessToken]);

  /* ================= DERIVE MODULE STATUS ================= */
  const getModuleStatus = useCallback(
    (moduleId) => {
      const progress = videoProgressMap[moduleId];

      if (!progress || !progress.progress) {
        return "NOT_STARTED";
      }

      if (progress.completed || progress.progress >= COMPLETION_PERCENT) {
        return "COMPLETED";
      }

      return "IN_PROGRESS";
    },
    [videoProgressMap]
  );

  /* ================= MODULES WITH STATUS ================= */
  const modulesWithStatus = useMemo(() => {
    return modulesData.map((mod) => ({
      ...mod,
      status: getModuleStatus(mod.id),
    }));
  }, [getModuleStatus]);

  /* ================= VIDEO PROGRESS HANDLER ================= */
  const handleVideoProgress = useCallback(
    async (moduleId, data) => {
      setVideoProgressMap((prev) => ({
        ...prev,
        [moduleId]: {
          lastWatchedSecond: data.currentTime,
          progress: data.percent,
          completed: data.percent >= COMPLETION_PERCENT,
        },
      }));

      const lastSaved = lastSavedRef.current[moduleId] || 0;

      if (data.currentTime - lastSaved >= 10) {
        lastSavedRef.current[moduleId] = data.currentTime;

        await ApiService.post("/api/preboard/video-progress", {
          userId: user?.id,
          moduleId,
          videoId: activeModule.videoId,
          lastWatchedSecond: data.currentTime,
          progress: data.percent,
        });
      }
    },
    [user, activeModule.videoId]
  );

  const setStatus = async (data) => {
      const set = {
        user_id: user?.id,
        module_id: data.id,
        status: data.status
      }

      const result = await ApiService.post("api/predoc/upsert", {set})
      console.log(result)
  }

  /* ================= RENDER ================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 p-6">
      <PreBoardHeader />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PreBoardGrid
          modules={modulesWithStatus}
          onSelect={setActiveModule}
          activeId={activeModule.id}
        />

        <PreBoardContent
          module={activeModule}
          videoProgress={videoProgressMap[activeModule.id]}
          onVideoProgress={handleVideoProgress}
          setStatus={setStatus}
        />
      </div>
    </div>
  );
};

export default PreBoard;
