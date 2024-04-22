import { useState, useEffect, useCallback } from 'react'
import { fetchService } from '../../service/fetchService'

const UseFetchDataB = <T,>(uri: string, organizationType: string) => {
  const [data, setData] = useState<T>()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async () => {
    console.log('en el fetch Data B')
    console.log('single organization ---> fetch  ', organizationType)
    console.log(organizationType)
    console.log(uri)
    if (!uri) return
    setLoading(true)
    try {
      const queryParams = {
        organization_name: organizationType,
      }
      const dataFromService = await fetchService(
        uri,
        organizationType ? queryParams : {},
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
    console.log(uri)
    fetchData()
  }, [uri, organizationType])
  console.log(data)
  return { data, loading, error }
}

export default UseFetchDataB
