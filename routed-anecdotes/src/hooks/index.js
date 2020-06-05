import { useState } from 'react'

export const useField = (type1) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
      setValue('')
  }

  const type = {
      type:type1,
      reset: reset
  }

  return {
    type,
    value,
    onChange,
  }
}