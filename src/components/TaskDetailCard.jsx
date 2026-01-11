import { X, Send, Paperclip } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useOutletContext, useParams } from "react-router-dom";
import { ApiService } from "../Services/ApiService"; 
import ConstantService from "../Services/ConstantService";

const TaskDetailCard = ({ task, onClose }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const params = useParams()
  const location = useLocation()
  const { id } = useOutletContext()

  console.log(task)

  useEffect(() => {
    if (!task?.id) return;
    fetchMessages();
  }, [task]);

  const fetchMessages = async () => {
    const res = await ApiService.post(`api/messages/getTaskMessages`, {
      taskId: task.id
    });
    setMessages(res.data);
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    await ApiService.post(`api/messages/createTaskMessages`, {
      taskId: task.id,
      senderId: params.trainerId || id,
      senderRole: location.pathname.split('/').includes('trainer') ? "TRAINER" : "TRAINEE",
      message,
    });

    setMessage("");
    fetchMessages();
  };

  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex justify-end z-50">
      <div className="w-full md:w-[440px] h-full bg-white shadow-2xl flex">
        <div className={`w-1 bg-gradient-to-b ${ConstantService.statusGradient[task.status] || ConstantService.statusGradient.ASSIGNED}`} />

        <div className="flex-1 flex flex-col">
          <TaskHeader task={task} onClose={onClose} />
          <TaskConversation messages={messages} currentUserId={params.trainerId || id} />
          <TaskInput
            message={message}
            setMessage={setMessage}
            onSend={sendMessage}
          />
        </div>
      </div>
    </div>
  );
};

/* ---------------- Sub Components ---------------- */

const TaskHeader = ({ task, onClose }) => (
  <div className="px-5 py-4 border-b bg-gradient-to-r from-orange-50 to-white">
    <div className="flex justify-between items-start">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">
          {task.title}
        </h2>
        <p className="text-sm text-gray-500 mt-1  line-clamp-1">
          {task.description}
        </p>
      </div>

      <button onClick={onClose} className="cursor-pointer p-1 rounded-full hover:bg-gray-200">
        <X size={18} />
      </button>
    </div>
  </div>
);

const TaskConversation = ({ messages, currentUserId }) => (
  <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 
       bg-[linear-gradient(to_bottom,#fafafa,transparent_120px)]">
    {messages.length > 0 && messages?.map((m) => (
      <MessageBubble key={m.id} data={m} isMe={m.senderId === currentUserId} />
    ))}
  </div>
);

const MessageBubble = ({ data, isMe }) => {
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-3 py-2 rounded-2xl text-sm max-w-[78%] shadow ${isMe
          ? "bg-orange-200 text-gray-900 rounded-br-md"
          : "bg-white text-gray-900 rounded-bl-md border"
          }`}
      >
        <p className="leading-relaxed">{data.message}</p>

        <span className="block text-[10px] text-gray-400 mt-1 text-right">
          <span className="block text-[10px] text-gray-400 mt-1 text-right">
            {new Date(data.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </span>
      </div>
    </div>
  );
};


const TaskInput = ({ message, setMessage, onSend }) => (
  <div className="px-4 py-3 border-t bg-white flex items-center gap-2">
    <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500">
      <Paperclip size={18} />
    </button>

    <input
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Write a reply..."
      className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none"
      onKeyDown={(e) => e.key === "Enter" && onSend()}
    />

    <button
      onClick={onSend}
      className="bg-primary hover:bg-primary/90 text-white rounded-full p-2 shadow"
    >
      <Send size={16} />
    </button>
  </div>
);

export default TaskDetailCard;
