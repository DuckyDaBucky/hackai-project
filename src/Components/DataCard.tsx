type Props = {
    label: string
    value: string
    color?: string
  }
  
  export default function DataCard({ label, value, color = 'bg-white' }: Props) {
    return (
      <div className={`rounded-xl shadow-md p-6 ${color} w-full max-w-xs`}>
        <p className="text-sm uppercase tracking-wide text-gray-500 mb-2">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    )
  }
  