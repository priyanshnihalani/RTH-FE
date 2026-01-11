import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import PreBoardHeader from "./Pre-BoardHeader";
import PreBoardGrid from "./Pre-BoardGrid";
import PreBoardContent from "./Pre-BoardContent";
import modulesData from "./modules";
import Cookie from "js-cookie";
import { ApiService } from "../../Services/ApiService";

const COMPLETION_PERCENT = 80;

const PreBoard = () => {
  const [activeModule, setActiveModule] = useState({});
  const [videoProgressMap, setVideoProgressMap] = useState({});
  const [docProgressMap, setDocProgressMap] = useState({});
  const [user, setUser] = useState(null);

  const lastSavedRef = useRef({});
  const accessToken = Cookie.get("accessToken");

  const orderedModules = useMemo(() => {
    const hasOdooFromApi =
      docProgressMap["odoo"] !== undefined ||
      videoProgressMap["odoo"] !== undefined;

    if (hasOdooFromApi) {
      const odoo = modulesData.find((m) => m.id === "odoo");
      const rest = modulesData.filter((m) => m.id !== "odoo");
      return odoo ? [odoo, ...rest] : modulesData;
    }

    return modulesData;
  }, [docProgressMap, videoProgressMap]);

  const loadProgress = async () => {
    try {
      const userRes = await ApiService.post(
        "/api/users/auth/me",
        { accessToken }
      );
      setUser(userRes);

      const [videoRes, docRes] = await Promise.all([
        ApiService.post("/api/preboard/video-progress/all", {
          userId: userRes.id,
        }),
        ApiService.post("/api/predoc/userprogress", {
          userId: userRes.id,
        }),
      ]);

      const videoMap = {};
      videoRes.forEach((row) => {
        videoMap[row.module_id] = {
          lastWatchedSecond: row.last_watched_second,
          progress: row.progress,
          completed: row.completed,
        };
      });

      const docMap = {};
      docRes.progress.forEach((row) => {
        docMap[row.module_id] = {
          status: row.status.toLowerCase(),
        };
      });

      setVideoProgressMap(videoMap);
      setDocProgressMap(docMap);
    } catch (err) {
      console.error("Failed to load progress", err);
    }
  };

  useEffect(() => {
    loadProgress();
  }, [accessToken]);

  useEffect(() => {
    if (!orderedModules.length) return;

    if (!activeModule) {
      setActiveModule(orderedModules[0]);
    }
  }, [orderedModules, activeModule]);



  const getModuleStatus = useCallback(
    (moduleId) => {
      const moduleMeta = modulesData.find((m) => m.id === moduleId);
      const video = videoProgressMap[moduleId];
      const doc = docProgressMap[moduleId];

      if (moduleMeta?.type === "doc") {
        if (doc?.status === "completed") return "COMPLETED";
        if (doc?.status === "started") return "IN_PROGRESS";
        return "NOT_STARTED";
      }

      if (moduleMeta?.type === "video") {
        if (video?.completed || video?.progress >= COMPLETION_PERCENT) {
          return "COMPLETED";
        }
        if (video && video.progress > 0) {
          return "IN_PROGRESS";
        }
        return "NOT_STARTED";
      }

      return "NOT_STARTED";
    },
    [videoProgressMap, docProgressMap]
  );


  const modulesWithStatus = useMemo(() => {
    return modulesData.map((mod) => ({
      ...mod,
      status: getModuleStatus(mod.id),
    }));
  }, [getModuleStatus]);


  const getOverallPreBoardProgress = useCallback(() => {
    let totalProgress = 0;

    modulesData.forEach((mod) => {
      if (mod.type === "doc") {
        if (docProgressMap[mod.id]?.status === "completed") {
          totalProgress += 25;
        }
      }

      if (mod.type === "video") {
        const videoProgress = videoProgressMap[mod.id]?.progress || 0;
        totalProgress += (videoProgress / 100) * 25;
      }
    });

    return Math.min(Math.round(totalProgress), 100);
  }, [docProgressMap, videoProgressMap]);


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

      const moduleMeta = modulesData.find((m) => m.id === moduleId);

      if (
        moduleMeta?.type === "doc" &&
        data.percent >= COMPLETION_PERCENT &&
        docProgressMap[moduleId]?.status !== "completed"
      ) {
        await setStatus({
          id: moduleId,
          status: "completed",
        });
      }

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
    [user, activeModule.videoId, docProgressMap]
  );

  const setStatus = async (data) => {
    const payload = {
      user_id: user?.id,
      module_id: data.id,
      status: data.status.toUpperCase(),
    };

    try {
      await ApiService.post("/api/predoc/upsert", payload);
      setDocProgressMap((prev) => ({
        ...prev,
        [data.id]: { status: payload.status },
      }));
      loadProgress()
    } catch (err) {
      console.error("Doc status update failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 p-6">
      <PreBoardHeader progress={getOverallPreBoardProgress()} />

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
