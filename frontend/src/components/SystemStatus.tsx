export default function SystemStatus() {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
      <span className="text-sm text-gray-400">System Online</span>
    </div>
  );
}
