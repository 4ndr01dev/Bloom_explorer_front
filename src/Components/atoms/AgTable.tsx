import React, { useMemo } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css' // Core style
import 'ag-grid-community/styles/ag-theme-alpine.css' // Theme
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community'

interface RowData {
  id: number
  name: string
  age: number
}

const AgTable: React.FC = () => {
  const columnDefs: ColDef[] = useMemo(
    () => [
      { headerName: 'ID', field: 'id' },
      { headerName: 'Name', field: 'name' },
      { headerName: 'Age', field: 'age' },
    ],
    [],
  )

  const rowData: RowData[] = useMemo(
    () => [
      { id: 1, name: 'John Doe', age: 24 },
      { id: 2, name: 'Jane Smith', age: 30 },
      { id: 3, name: 'Gary White', age: 19 },
    ],
    [],
  )

  const onGridReady = (params: GridReadyEvent) => {
    const gridApi: GridApi = params.api
    gridApi.sizeColumnsToFit()
  }

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        onGridReady={onGridReady}
      ></AgGridReact>
    </div>
  )
}

export default AgTable
