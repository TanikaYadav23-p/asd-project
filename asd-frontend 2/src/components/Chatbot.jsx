
import React, { useState, useRef, useEffect } from "react";
import {
  Bot,
  Menu,
  X,
  Plus,
  Search,
  MessageSquare,
  Home,
  Plane,
  Truck,
  FileText,
  ShieldCheck,
  Landmark,
  TrendingUp,
  BarChart2,
  BookOpen,
  HelpCircle,
  Bell,
  ChevronDown,
  Paperclip,
  Mic,
  Camera,
  Send,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  ShieldAlert,
  Wallet,
  Radar,
  Crown,
  Ship,
  GitCompare,
  Clock,
  FileSearch,  BadgeCheck, Globe2,     BadgePercent
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import chatbot from "../assets/Images/webp/chatbot.webp";
const services = [
  {
    icon: ShieldCheck,
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
    title: "GLOBAL LOGISTICS CORP - Global Trade Insurance",
    desc: "Protect your cargo globally. Instant quotes.",
    cta: "Learn More",
  },
  {
    icon: BadgePercent,
    iconBg: "bg-teal-500/20",
    iconColor: "text-teal-400",
    title: "TRADE FINANCE SOLUTIONS - Import/Export Financing",
    desc: "Specialized pre-shipment and post-shipment finance up to ₹10 Crores.",
    cta: "Apply Now",
  },
];
const trendData = [
  { date: "10 May", rate: 1.95 },
  { date: "12 May", rate: 2.05 },
  { date: "14 May", rate: 1.98 },
  { date: "17 May", rate: 2.1 },
  { date: "19 May", rate: 2.18 },
  { date: "21 May", rate: 2.12 },
  { date: "24 May", rate: 2.28 },
  { date: "26 May", rate: 2.35 },
  { date: "28 May", rate: 2.3 },
  { date: "31 May", rate: 2.45 },
  { date: "02 Jun", rate: 2.5 },
  { date: "04 Jun", rate: 2.42 },
  { date: "07 Jun", rate: 2.6 },
  { date: "09 Jun", rate: 2.55 },
  { date: "11 Jun", rate: 2.68 },
  { date: "13 Jun", rate: 2.7 },
  { date: "07 Jun", rate: 2.75 },
];

const navItems = [
  { icon: Home, label: "AI Assistant", badge: "New", active: true },
  { icon: Plane, label: "Freight Intelligence" },
  { icon: Truck, label: "Shipment Tracking" },
  { icon: FileText, label: "Documentation" },
  { icon: ShieldCheck, label: "Trade Compliance" },
  { icon: Search, label: "HS Code Finder" },
  { icon: Wallet, label: "Trade Finance" },
  { icon: Landmark, label: "Government Schemes" },
  { icon: TrendingUp, label: "Market Insights" },
  { icon: BarChart2, label: "Reports & Analytics" },
  { icon: BookOpen, label: "Training & Resources" },
  { icon: HelpCircle, label: "Support Center" },
];

const quickOptions = [
  {
    icon: Ship,
    text: "What about sea freight?",
    response:
      "Sea freight to London currently averages $0.85 per kg with a transit time of 18-22 days via major carriers. It costs far less than air freight but takes longer, making it ideal for bulk, non-urgent shipments.",
  },
  {
    icon: GitCompare,
    text: "Compare air vs sea",
    response:
      "Air freight: $2.75/kg, 2 days, best for urgent or high-value cargo. Sea freight: $0.85/kg, 18-22 days, best for bulk or non-urgent cargo. Pick air for speed, sea for cost savings on volume.",
  },
  {
    icon: TrendingUp,
    text: "Show price trend",
    response:
      "Freight rates to London have risen 12.5% over the last 30 days, driven by peak season demand and higher fuel surcharges. Rates are expected to keep climbing over the next two weeks.",
  },
  {
    icon: Clock,
    text: "Best time to book?",
    response:
      "Now is a good time to book. Rates are trending upward and pre-booking today could save you 8-10% compared to waiting, based on the current 30-day trend.",
  },
];

const badges = [
  { icon: ShieldCheck, label: "Trusted by", value: "5000+ Businesses" },
  { icon: ShieldCheck, label: "MSME Support", value: "Verified", check: true },
  { icon: ShieldCheck, label: "DGFT Guidance", value: "Verified", check: true },
  { icon: FileSearch, label: "ICEGATE", value: "Verified", check: true },
];

const alertCards = [
  {
    icon: TrendingUp,
    color: "red",
    title: "Rate Alert",
    desc: "London routes rates increasing by 12%",
    action: "Book Early & Save",
  },
  {
    icon: Wallet,
    color: "green",
    title: "Finance Tip",
    desc: "Pre-Shipment Credit up to ₹ 10 Lakhs",
    action: "Check Eligibility",
  },
  {
    icon: Radar,
    color: "blue",
    title: "Shipment Tracking",
    desc: "EK521 to New York ETA: 24 Hrs",
    action: "Track Now",
  },
  {
    icon: ShieldAlert,
    color: "orange",
    title: "Risk Alert",
    desc: "HS Code verification recommended",
    action: "Check Now",
  },
];

const colorMap = {
  red: "bg-red-50 text-red-600 border-red-100",
  green: "bg-green-50 text-green-600 border-green-100",
  blue: "bg-blue-50 text-blue-600 border-blue-100",
  orange: "bg-orange-50 text-orange-600 border-orange-100",
};

const initialMessages = [
  {
    id: "m1",
    kind: "text",
    sender: "bot",
    text:
      "👋 Hello! I'm your AI Trade Assistant. I can help you with EXIM, Logistics, Compliance, Documentation, Freight Rates, and more. How can I assist you today?",
    time: "10:30 AM",
  },
  {
    id: "m2",
    kind: "text",
    sender: "user",
    text: "Get me the current air freight rate to London.",
    time: "10:31 AM",
  },
  { id: "m3", kind: "analyzing" },
  { id: "m4", kind: "freight-card" },
  { id: "m5", kind: "quick-chips" },
  { id: "m6", kind: "alerts" },
];

function Badge({ icon: Icon, label, value, check }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg whitespace-nowrap shrink-0">
      <Icon size={16} className="text-blue-600 shrink-0" />
      <div className="leading-tight text-xs">
        <div className="text-gray-500">{label}</div>
        <div className="font-semibold text-gray-800 flex items-center gap-1">
          {value}
          {check && <ShieldCheck size={12} className="text-green-500" />}
        </div>
      </div>
    </div>
  );
}

function FreightCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Plane size={18} className="text-blue-600" />
          <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
            Freight Rate Intelligence
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          Live Rates
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div>
          <dl className="space-y-2.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500">Destination</dt>
              <dd className="font-medium text-gray-900">🇬🇧 London Heathrow (LHR)</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Flight / Airline</dt>
              <dd className="font-medium text-gray-900">✈️ BA 142 – British Airways</dd>
            </div>
            <div className="flex justify-between items-center">
              <dt className="text-gray-500">Freight Rate</dt>
              <dd className="font-medium text-gray-900 flex items-center gap-1">
                $2.75 per kg
                <ArrowDown size={13} className="text-green-500" />
                <span className="text-green-500 text-xs">1.2%</span>
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Transit Time</dt>
              <dd className="font-medium text-gray-900">2 Days</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Capacity</dt>
              <dd className="font-medium text-green-600">Available</dd>
            </div>
            <div className="flex justify-between items-center">
              <dt className="text-gray-500">Price Trend</dt>
              <dd className="font-medium text-red-500 flex items-center gap-1">
                Increasing
                <ArrowUp size={13} />
              </dd>
            </div>
          </dl>

          <div className="flex flex-wrap gap-2 mt-4">
            <button className="px-4 py-2 bg-blue-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-blue-700 transition">
              Book Shipment
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 text-xs sm:text-sm font-medium rounded-lg hover:bg-gray-50 transition">
              Compare Options
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 text-xs sm:text-sm font-medium rounded-lg hover:bg-gray-50 transition">
              View Details
            </button>
          </div>
        </div>

        <div>
          {/* <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">
              Historical Freight Trend (30 Days)
            </span>
            <span className="text-xs font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
              +12.5%
            </span>
          </div> */}
          
              <div className="relative overflow-hidden rounded-xl bg-[#0f2333] p-4 text-white h-full sm:h- border-2 border-black">
                <div className="flex items-center gap-2 mb-3 ">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                    <Globe2 size={13} className="text-white" />
                  </div>
                  <p className="text-xs font-medium text-slate-200 leading-tight">
                    GLOBAL EXPORT PARTNERS - Preferred Vendor
                  </p>
                  <BadgeCheck size={14} className="text-blue-400 shrink-0" />
                </div>
          
                <h3 className="text-lg font-medium leading-snug mb-4 max-w-[230px] relative z-10">
                  Fast-Track Your UK/EU Exports with Custom Solutions and Exclusive
                  Rates!
                </h3>
          
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors relative z-10">
                  Explore Services
                </button>
          
                <Ship
                  size={80}
                  className="absolute bottom-2 right-3 text-white/10"
                  strokeWidth={1.5}
                />
              </div>

       
          {/* <div className="mt-2 bg-green-50 border border-green-100 rounded-lg px-3 py-2 text-xs text-green-800 flex gap-1.5">
            <span>💡</span>
            <span>
              <strong>Tip:</strong> Rates to London are likely to increase
              further. Pre-book now to save more!
            </span>
          </div> */}
        </div>
      </div>
    </div>
  );
}

function AlertCard({ icon: Icon, color, title, desc, action }) {
  return (
    <div className={`rounded-xl border p-3 sm:p-4 ${colorMap[color]}`}>
      <div className="flex items-center gap-2 mb-1.5">
        <Icon size={16} />
        <span className="font-semibold text-sm text-gray-900">{title}</span>
      </div>
      <p className="text-xs text-gray-600 mb-2">{desc}</p>
      <button className="text-xs font-semibold flex items-center gap-1">
        {action} <span>→</span>
      </button>
    </div>
  );
}

export default function CargoMateChat() {
  const [recentChats, setRecentChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [plusOpen, setPlusOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(initialMessages);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);
  const plusRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  useEffect(() => {
    function handleClick(e) {
      if (plusRef.current && !plusRef.current.contains(e.target)) {
        setPlusOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const saveCurrentChat = () => {
    if (messages.length === 0) return;
    const firstUserMessage = messages.find(
      (m) => m.kind === "text" && m.sender === "user"
    );
    const title = firstUserMessage ? firstUserMessage.text : "New Chat";
    const chat = {
      id: currentChatId || Date.now(),
      title,
      messages,
      updatedAt: Date.now(),
    };
    setRecentChats((prev) => {
      const filtered = prev.filter((c) => c.id !== chat.id);
      return [chat, ...filtered];
    });
  };

  const startNewChat = () => {
    saveCurrentChat();
    setMessages([]);
    setCurrentChatId(null);
    setInput("");
    setSidebarOpen(false);
  };

  const openRecentChat = (chat) => {
     
    setMessages(chat.messages);
    setCurrentChatId(chat.id);
    setSidebarOpen(false);
  };

  const sendMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg = {
      id: Date.now(),
      kind: "text",
      sender: "user",
      text: trimmed,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setPlusOpen(false);
    setTyping(true);

    const matched = quickOptions.find(
      (o) => o.text.toLowerCase() === trimmed.toLowerCase()
    );
    const replyText = matched
      ? matched.response
      : `Here's what I found regarding "${trimmed}". Based on current trade data, I'll pull the latest rates, compliance notes and documentation requirements for this shortly.`;

    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          kind: "text",
          sender: "bot",
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 3000);
  };

  const handleOptionClick = (text) => {
    setInput(text);
    setPlusOpen(false);
  };

  const renderMessage = (m) => {
    if (m.kind === "text" && m.sender === "user") {
      return (
        <div key={m.id} className="flex justify-end">
          <div className="max-w-2xl">
            <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm">
              {m.text}
            </div>
            <span className="text-[11px] text-gray-400 flex justify-end mr-1 mt-1">
              {m.time} ✓
            </span>
          </div>
        </div>
      );
    }

    if (m.kind === "text" && m.sender === "bot") {
      return (
        <div key={m.id} className="flex sm:gap-3 gap-1 max-w-2xl">
          <div className="sm:w-20 h-9 rounded-full w-10 sm:flex items-center justify-center shrink-0">
            <img src={chatbot} alt="chatbot" className="sm:w-16 sm:h-16" />
          </div>
          <div>
            <div className="bg-blue-50 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-gray-800">
              {m.text}
            </div>
            <span className="text-[11px] text-gray-400 ml-1">{m.time}</span>
          </div>
        </div>
      );
    }

    if (m.kind === "analyzing") {
      return (
        <div key={m.id} className="flex gap-3 max-w-2xl">
          <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0">
            <img src={chatbot} alt="chatbot" className="w-10 h-10" />
          </div>
          <span className="text-sm text-gray-500 mt-2">
            Analyzing latest rates for London Heathrow...
          </span>
        </div>
      );
    }

    if (m.kind === "freight-card") {
      return (
        <div key={m.id}>
          <FreightCard />
        </div>
      );
    }

    if (m.kind === "quick-chips") {
      return (
        <div key={m.id} className="flex flex-wrap gap-2">
          {quickOptions.map((opt) => (
            <button
              key={opt.text}
              onClick={() => sendMessage(opt.text)}
              className="px-3 py-1.5 border border-gray-200 rounded-full text-xs text-blue-700 hover:bg-blue-50 transition"
            >
              {opt.text}
            </button>
          ))}
          <button
            onClick={() =>
              setMessages((prev) => prev.filter((msg) => msg.id !== m.id))
            }
            className="p-1.5 border border-gray-200 rounded-full text-gray-400 hover:bg-gray-50 transition"
          >
            <RefreshCw size={13} />
          </button>
        </div>
      );
    }

    if (m.kind === "alerts") {
      return (
        <div key={m.id} className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {alertCards.map((a) => (
            <AlertCard key={a.title} {...a} />
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col pt-14">
      {/* <header className="flex items-center justify-between gap-3 px-3 sm:px-5 py-3 border-b border-gray-200 shrink-0">
        <div className="flex">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
            <Menu size={22} className="text-gray-600" />
          </button>

          <div className="flex items-center gap-2 shrink-0">
            <div className="rounded-full flex items-center justify-center">
              <img src={chatbot} alt="chatbot" className="hidden sm:w-16 sm:h-16" />
            </div>
            <div className="leading-tight hidden sm:block">
              <div className="font-bold text-blue-700 text-base">
                ASD CargoMate<span className="align-super text-xs">™</span>
              </div>
              <div className="text-[11px] text-gray-500">Your Smart Trade Assistant</div>
            </div>
          </div>
        </div>

        <div className="flex sm:hidden md:flex items-center gap-2 sm:gap-4 shrink-0">
        
          <button className="flex items-center gap-1 text-sm text-gray-600">
            English <ChevronDown size={14} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-16 h-8 rounded-full flex items-center justify-center">
              <img src={chatbot} alt="chatbot" className="w-10 h-10 sm:w-14 sm:h-14" />
            </div>
            <div className="leading-tight text-xs">
              <div className="font-semibold text-gray-800">ASD Logistics</div>
              <div className="text-blue-600">Pro Plan</div>
            </div>
          </div>
        </div>
      </header> */}

      <div className="flex h-screen w-full bg-white text-gray-900 overflow-hidden font-sans">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* <aside
          className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 flex flex-col transition-transform duration-200 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
        >
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 lg:hidden">
            <span className="font-semibold text-blue-700">Menu</span>
            <button onClick={() => setSidebarOpen(false)}>
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          <div className="p-3 space-y-2 border-b border-gray-100">
            <button
              onClick={startNewChat}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
            >
              <Plus size={16} />
              New Chat
            </button>
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-500">
              <Search size={16} />
              <input
                placeholder="Search chats..."
                className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto p-3 space-y-1 light-scrollbar">
        

            <div className="pt-3 mt-2 border-t border-gray-100">
              <p className="px-3 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Recent Chats
              </p>
              {recentChats.length === 0 && (
                <p className="px-3 py-2 text-xs text-gray-400">No chats yet</p>
              )}
              {recentChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => openRecentChat(chat)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                    chat.id === currentChatId
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <MessageSquare size={15} className="shrink-0 text-gray-400" />
                  <span className="truncate text-left">{chat.title}</span>
                </button>
              ))}
            </div>
          </nav>

          <div className="p-3 border-t border-gray-100">
            <div className="bg-blue-600 rounded-xl p-4 text-white relative">
              <div className="flex items-center gap-2 mb-1">
                <Crown size={16} />
                <span className="font-semibold text-sm">Pro Plan</span>
              </div>
              <p className="text-xs text-blue-100 mb-3">Valid till 30 Aug 2025</p>
              <button className="w-full bg-white text-blue-700 text-xs font-semibold py-2 rounded-lg hover:bg-blue-50 transition">
                Upgrade Plan
              </button>
              <p className="text-[11px] text-blue-100 mt-3 mb-1">
                Queries Used 245 / 1000
              </p>
              <div className="w-full h-1.5 bg-blue-500 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full" style={{ width: "24.5%" }} />
              </div>
            </div>
          </div>
        </aside> */}

        <div className="flex-1 flex flex-col min-w-0">
          <main
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-3 sm:px-5 py-5 space-y-5 light-scrollbar"
          >
            {messages.length === 0 && (
              <div className="h-full flex items-center justify-center text-sm text-gray-400">
                Start typing to begin a new chat
              </div>
            )}
            {messages.map(renderMessage)}

            {typing && (
              <div className="flex gap-3 max-w-2xl">
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                  <img src={chatbot} alt="chatbot" className="w-10 h-10" />
                </div>
                <div className="bg-blue-50 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
                </div>
              </div>
            )}

             <div>
      <p className="text-xs font-medium text-slate-500 tracking-wide mb-3">
        FEATURED SERVICES
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {services.map(({ icon: Icon, iconBg, iconColor, title, desc, cta }) => (
          <div
            key={title}
            className="bg-[#0f1b2d] rounded-xl p-4 text-white flex flex-col gap-2"
          >
            <div className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center`}>
              <Icon size={16} className={iconColor} />
            </div>
            <p className="text-sm font-medium leading-snug">{title}</p>
            <p className="text-xs text-slate-400 leading-snug">{desc}</p>
            <button className="mt-2 bg-white hover:bg-slate-100 text-slate-900 text-sm font-medium py-2 rounded-lg transition-colors">
              {cta}
            </button>
          </div>
        ))}
      </div>
    </div>

          </main>
 
          
          <div className="border-t border-gray-200 px-3 sm:px-5 py-3 shrink-0">
            <div className="relative flex items-center gap-2 max-w-4xl mx-auto">
              {plusOpen && (
                <div
                  ref={plusRef}
                  className="absolute bottom-full mb-2 left-0 w-72 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-20"
                >
                  {quickOptions.map((opt) => (
                    <button
                      key={opt.text}
                      onClick={() => handleOptionClick(opt.text)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition text-left"
                    >
                      <opt.icon size={17} className="text-gray-500 shrink-0" />
                      {opt.text}
                    </button>
                  ))}
                </div>
              )}

              <button
                onClick={() => setPlusOpen((v) => !v)}
                className="p-2.5 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-50 transition shrink-0"
              >
                {plusOpen ? <X size={18} /> : <Plus size={18} />}
              </button>

              <div className="flex-1 flex items-center gap-2 bg-white border border-gray-300 rounded-full px-4 py-2.5">
                <Paperclip size={17} className="text-gray-400 shrink-0" />
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                  placeholder="Ask anything about Export, Import, Logistics or Trade..."
                  className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 min-w-0"
                />
                <Mic size={17} className="text-gray-400 shrink-0 hidden sm:block" />
                <Camera size={17} className="text-gray-400 shrink-0 hidden sm:block" />
              </div>

              <button
   
                onClick={() => {
                   sendMessage(input)
                   saveCurrentChat()
                }}
                className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition shrink-0"
              >
                <Send size={16} />
              </button>
            </div>
            <p className="text-center text-[11px] text-gray-400 mt-2">
              ASD CargoMate AI may provide inaccurate info. Please verify with official sources.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}