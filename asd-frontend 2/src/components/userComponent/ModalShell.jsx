export default function ModalShell({ children, width = "max-w-md" }) {
  return (
   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-6 ">
      <div className={`w-full ${width} bg-white rounded-2xl shadow-2xl flex flex-col max-h-[80vh]`}>
        <div className="p-4 sm:p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}