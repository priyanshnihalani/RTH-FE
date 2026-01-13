import { useState, useMemo, useCallback, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  format,
  parse,
  startOfWeek,
  getDay,
  addHours,
} from "date-fns";
import enUS from "date-fns/locale/en-US";
import { ApiService } from "../../Services/ApiService"
import {
  ChevronLeft,
  ChevronRight,
  X,
  Trash2,
  Clock,
  Calendar as CalendarIcon,
  Pencil,
} from "lucide-react";

/* ================= LOCALIZER ================= */
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { "en-US": enUS },
});

/* ================= COLORS ================= */
const EVENT_COLORS = [
  "#FB8924",
  "#10B981",
  "#3B82F6",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
];

const getRandomColor = () =>
  EVENT_COLORS[Math.floor(Math.random() * EVENT_COLORS.length)];

/* ================= TOOLBAR ================= */
const CustomToolbar = ({ label, view, onView, onNavigate }) => (
  <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b bg-white/60 backdrop-blur-xl">
    <h2 className="text-xl font-bold text-gray-800">{label}</h2>

    <div className="flex items-center gap-2">
      <button
        onClick={() => onNavigate("TODAY")}
        className="px-4 py-1.5 rounded-lg bg-orange-50 text-orange-600 text-sm font-medium"
      >
        Today
      </button>

      <button onClick={() => onNavigate("PREV")} className="p-2 rounded-full hover:bg-slate-100">
        <ChevronLeft />
      </button>
      <button onClick={() => onNavigate("NEXT")} className="p-2 rounded-full hover:bg-slate-100">
        <ChevronRight />
      </button>
    </div>

    <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
      {["month", "week", "day"].map(v => (
        <button
          key={v}
          onClick={() => onView(v)}
          className={`px-4 py-1.5 rounded-lg text-sm capitalize ${view === v
            ? "bg-[#FB8924] text-white shadow"
            : "text-gray-600 hover:bg-white"
            }`}
        >
          {v}
        </button>
      ))}
    </div>
  </div>
);

export const Notes = () => {
  const { id } = useParams();
  const location = useLocation()
  const [trainerEvents, setTrainerEvents] = useState({});
  const events = trainerEvents[id] || [];

  const [view, setView] = useState("week");
  const [date, setDate] = useState(new Date());
  const [slot, setSlot] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");

  const closeModal = () => {
    setSlot(null);
    setSelectedEvent(null);
    setIsEditing(false);
    setTitle("");
  };

  const addEvent = async () => {
    if (!title.trim()) return;

    const payload = {
      author_id: id,
      noteDate: format(slot, "yyyy-MM-dd"),
      startTime: format(slot, "HH:mm:ss"),
      endTime: format(addHours(slot, 1), "HH:mm:ss"),
      notes: title
    };

    await ApiService.post("/api/notes/create", payload);
    await fetchNotes()
    await fetchUser()
    closeModal()
  };

  const updateEvent = async () => {
    if (!title.trim()) return;

    await ApiService.put(
      `/api/notes/update/${selectedEvent?.id}`,
      {
        author_id: id,
        notes: title
      }
    );

    await fetchNotes()
    await fetchUser()
    closeModal();
  };

  const deleteEvent = async () => {
    await ApiService.delete(
      `/api/notes/remove/${selectedEvent?.id}`,
      {
        data: { author_id: id }
      }
    );

    await fetchNotes()
    await fetchUser()
    closeModal();
  };

  const fetchUser = async () => {
    await ApiService.get("/api/users/auth/me")
  }


  const fetchNotes = async () => {
    const result = await ApiService.get("/api/notes/getAll", {
      params: {
        author_id: id
      }
    });
    setTrainerEvents(prev => ({
      ...prev,
      [id]: result.map(note => ({
        id: note.id,
        title: note.notes,
        start: new Date(`${note.noteDate}T${note.startTime}`),
        end: new Date(`${note.noteDate}T${note.endTime}`),
        color: getRandomColor(),
      }))
    }));

  }
  useEffect(() => {
    fetchNotes()
    fetchUser()
  }, [])

  const eventPropGetter = useCallback(event => ({
    style: {
      backgroundColor: event.color,
      borderRadius: "8px",
      color: "white",
      border: "none",
      padding: "6px 8px",
      fontSize: "0.85rem",
      boxShadow: "0 6px 14px rgba(0,0,0,0.12)",
    },
  }), []);

  const components = useMemo(() => ({ toolbar: CustomToolbar }), []);

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-orange-100 p-8 space-y-6">

      {/* ================= HEADER ================= */}
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-[0_4px_8px_rgba(0,0,0,0.08)]">
        <h1 className="text-3xl font-bold text-gray-800">
          Activity Notes
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Track daily sessions, reminders & training activities
        </p>
      </div>

      {/* ================= CALENDAR CARD ================= */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden">
        <Calendar
          selectable
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          view={view}
          date={date}
          onView={setView}
          onNavigate={setDate}
          views={["month", "week", "day"]}
          onSelectSlot={({ start }) => setSlot(start)}
          onSelectEvent={setSelectedEvent}
          eventPropGetter={eventPropGetter}
          components={components}
          style={{ height: 650 }}
        />
      </div>

      {/* ================= MODAL ================= */}
      {((slot || selectedEvent) && !location.pathname.split('/').includes('admin')) && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={e => e.target === e.currentTarget && closeModal()}
        >
          <div className="w-[360px] bg-white rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">
                {slot ? "Create Event" : isEditing ? "Edit Event" : selectedEvent.title}
              </h3>
              <button onClick={closeModal}><X /></button>
            </div>

            {(slot || isEditing) && (
              <input
                autoFocus
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Event title"
                className="w-full border rounded-lg px-4 py-2"
              />
            )}

            {selectedEvent && !isEditing && (
              <>
                <div className="text-sm flex items-center mt-3 text-gray-600">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {format(selectedEvent.start, "PPP")}
                </div>
                <div className="text-sm flex items-center mt-1 text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  {format(selectedEvent.start, "p")} - {format(selectedEvent.end, "p")}
                </div>
              </>
            )}

            <div className="mt-6 flex justify-between">
              {slot && (
                <button
                  onClick={addEvent}
                  className="ml-auto bg-[#FB8924] text-white px-4 py-2 rounded-lg"
                >
                  Save
                </button>
              )}

              { selectedEvent && !isEditing && (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-1"
                  >
                    <Pencil size={16} /> Edit
                  </button>
                  <button
                    onClick={deleteEvent}
                    className="flex items-center gap-1 text-red-600"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </>
              )}

              {isEditing && (
                <>
                  <button onClick={closeModal}>Cancel</button>
                  <button
                    onClick={updateEvent}
                    className="bg-[#FB8924] text-white px-4 py-2 rounded-lg"
                  >
                    Update
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Notes