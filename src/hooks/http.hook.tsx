import { useCallback, useState } from "react"

export const useFetch = () => {
  const [errors, setErrors] = useState({})

  const request = useCallback(async (url, method = 'POST', body = null) => {
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body
    })
    const data = await response.json()

    // Errors
    if (data.hasOwnProperty('errors')) {
      let err = {}
      data.errors.forEach(el => {
        err[el.param] = el.msg
      })
      setErrors(err)
    }
    
    return data
  }, [])

  return { request, errors }
}
