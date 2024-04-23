import { useState, useEffect, useCallback } from 'react'
import { fetchService } from '../../service/fetchService'

const UseFetchDataB = <T,>(uri: string, organizationType?: string) => {
  const [data, setData] = useState<T>()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async () => {
    if (!uri) return
    setLoading(true)
    try {
      const queryParams = organizationType?{
        organization_name: organizationType,
      }: undefined
      const dataFromService = await fetchService(
        uri,
        queryParams,
        { method: 'GET' },
      )
      setData(dataFromService)
      setLoading(false)
    } catch (err) {
      if (err instanceof Error) {
        setError(err)
      }
      setLoading(false)
    }
  }, [uri, organizationType])
  useEffect(() => {
    if (!uri) return
    fetchData()
  }, [uri, organizationType])
  return { data, loading, error }
}

export default UseFetchDataB
