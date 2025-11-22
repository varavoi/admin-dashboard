import { useState } from "react"

export const useLocaleStorage = <T>(key:string,initialValue:T)=>{
    const [storedValue, setStoredValue] = useState<T>(
        ()=>{
            try {
                const item=window.localStorage.getItem(key)
                return item?JSON.parse(item):initialValue
            } catch (error) {
                console.error(`Error reading localStorage key "${key}":`, error);
                return initialValue
            }
        }
    )
    const setValue = (value:T|((val:T)=>T))=>{
        try {
            const valueStore = value instanceof Function?value(storedValue):value
            setStoredValue(valueStore)
            window.localStorage.setItem(key,JSON.stringify(valueStore))
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    }
    return [storedValue,setValue] as const
}

