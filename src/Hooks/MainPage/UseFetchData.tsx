import { useState, useEffect, useCallback } from 'react'


const UseFetchData = <T,>(uri: string) => {
  const [data, setData] = useState<T>()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  const fetchData = useCallback(async () => {
    console.log('en el fetch Data')
    if (!uri || data) return
    setLoading(true)
    try {
      const url = process.env.REACT_APP_DEV_API_URL + uri
      const response = await fetch(url, { method: 'GET' })
      const body = await response.json()

      setData(body)
    } catch (err) {
      if (err instanceof Error) {
        setError(err)
      }
      setLoading(false)
    }
  }, [uri])
  useEffect(() => {
    if (!uri || data) return
    console.log(uri)
    fetchData()
  }, [uri, fetchData, data])

  return { data, loading, error }
}

export default UseFetchData
