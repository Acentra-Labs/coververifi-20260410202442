export default function StatsCard({ icon: Icon, label, value, color = 'text-gray-900', bgColor = 'bg-white' }) {
  return (
    <div className={`${bgColor} rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-center gap-3">
        {Icon && (
          <div className={`p-2 rounded-lg bg-gray-50`}>
            <Icon className={`w-5 h-5 ${color}`} />
          </div>
        )}
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
        </div>
      </div>
    </div>
  );
}
