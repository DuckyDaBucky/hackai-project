import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  LineChart, Line,
  ResponsiveContainer
} from 'recharts'

type Props = {
  type: 'pie' | 'bar' | 'line'
  title: string
  labels: string[]
  values: number[]
}

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#14b8a6']

export default function DynamicChart({ type, title, labels, values }: Props) {
  const data = labels.map((label, i) => ({
    name: label,
    value: values[i],
  }))

  return (
    <div className="w-full max-w-3xl mx-auto py-6">
      <h3 className="text-xl font-semibold text-center mb-4">{title}</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          {type === 'pie' ? (
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} label>
                {data.map((_, i) => (
                  <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          ) : type === 'line' ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#6366f1" />
            </LineChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  )
}
