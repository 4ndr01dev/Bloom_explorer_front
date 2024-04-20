import { useState, useEffect } from 'react'
import Papa from 'papaparse'
import Organization from '../../types/Organization'

const UseLoadCsv = (url: string) => {
  const [data, setData] = useState<Organization[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(url)
        const text = await response.text()
        const results = Papa.parse<Organization>(text, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          transformHeader: (header) => header.trim(),
          complete: (results) => {
            setData(results.data)
            setLoading(false)
          },
        })
        if (results) return
      } catch (err) {
        if (err instanceof Error) {
          setError(err)
          setLoading(false)
        }
      }
    }

    fetchData()
  }, [url])

  return { data, loading, error }
}

export default UseLoadCsv
