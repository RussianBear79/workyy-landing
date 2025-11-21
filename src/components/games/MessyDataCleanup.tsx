import { useState } from 'react'

export const MessyDataCleanup = () => {
  const initialRows = [
    { id: 1, label: 'Week 1', value: 120, status: 'ok' },
    { id: 2, label: 'Week 2', value: 138, status: 'ok' },
    { id: 3, label: 'Week 3', value: null, status: 'missing' },
    { id: 4, label: 'Week 4', value: 860, status: 'outlier' },
    { id: 5, label: 'Week 5', value: 160, status: 'ok' },
  ]
  const [rows, setRows] = useState(initialRows)

  const handleFix = (id: number) => {
    setRows((prev) =>
      prev.map((row) => {
        if (row.id !== id) return row
        if (row.status === 'missing') {
          return { ...row, value: 145, status: 'ok' }
        }
        if (row.status === 'outlier') {
          return { ...row, value: 150, status: 'ok' }
        }
        return row
      })
    )
  }

  const dirtyLeft = rows.filter((row) => row.status !== 'ok').length

  return (
    <div className="bg-[#07122b] border border-white/10 rounded-2xl p-6">
      <p className="text-sm text-gray-400 mb-4">Clean up messy data</p>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-400">
            <th className="text-left pb-2">Week</th>
            <th className="text-left pb-2">Value</th>
            <th className="text-right pb-2">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-200">
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-white/10">
              <td className="py-2">{row.label}</td>
              <td className="py-2">
                {row.value ?? '—'}
                {row.status !== 'ok' && (
                  <span className="ml-2 text-xs text-brand-green uppercase">{row.status}</span>
                )}
              </td>
              <td className="py-2 text-right">
                {row.status !== 'ok' ? (
                  <button
                    onClick={() => handleFix(row.id)}
                    className="text-xs text-brand-green hover:text-white transition"
                  >
                    Fix
                  </button>
                ) : (
                  <span className="text-xs text-gray-500">clean</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-gray-400 mt-4">
        {dirtyLeft === 0 ? 'Done! Dataset is ready for analysis.' : `${dirtyLeft} rows left to clean`}
      </p>
    </div>
  )
}

