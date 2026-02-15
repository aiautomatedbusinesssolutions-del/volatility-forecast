export default function Loader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-8 text-slate-400">
      <div className="h-5 w-5 rounded-full border-2 border-slate-700 border-t-sky-400 animate-spin-slow" />
      <span className="text-sm">{text}</span>
    </div>
  );
}
