import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from 'recharts'
import type { AgeHistogram } from '../types'

const AGE_ORDER = ['18-25', '26-35', '36-45', '46-55', '56-65', '66+']

interface AgeHistogramChartProps {
    histogram: AgeHistogram
}

export default function AgeHistogramChart({ histogram }: AgeHistogramChartProps) {
    const data = AGE_ORDER.map((label) => ({
        label,
        count: histogram[label] ?? 0,
    }))

    return (
        <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer>
                <BarChart
                    data={data}
                    margin={{ top: 16, right: 16, left: 0, bottom: 16 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="count" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
