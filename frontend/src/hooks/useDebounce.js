import { useState, useEffect } from 'react'

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay)

        return () => {
            // clear time out after each call debounce
            clearTimeout(handler)
        }
    }, [value])

    return debouncedValue;
}

export default useDebounce;