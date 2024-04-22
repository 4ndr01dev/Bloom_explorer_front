import { useState, useEffect, useCallback } from 'react'
import Papa from 'papaparse'
// import Organization from '../../types/Organization'

const UseLoadCsv = (url: string) => {
  const [csvData, setData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  const fetchData = useCallback(async () => {
    console.log('en el fetch Data Local load')

    if (!url) return
    if (csvData.length) {
      console.log('hola')
    }
    setLoading(true)
    try {
      const response = await fetch(url)
      const text = await response.text()
      Papa.parse<any>(text, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.trim(),
        complete: (results) => {
          setData(results.data)
          setLoading(false)
        },
        error: (err: any) => {
          setError(err)
          setLoading(false)
        },
      })
    } catch (err) {
      if (err instanceof Error) {
        setError(err)
      }
      setLoading(false)
    }
  }, [])
  useEffect(() => {
    if (!url) return
    fetchData()
  }, [])

  return { csvData, loading, error }
}

export default UseLoadCsv
