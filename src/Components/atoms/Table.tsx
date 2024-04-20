import React from 'react'
import './Table.scss'

interface TableProps<T> {
  data: T[]
}

const Table = <T extends Record<string, any>>({ data }: TableProps<T>) => {
  return (
    <>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((val, i) => (
                  <td key={i}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Table
