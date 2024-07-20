import React, {useEffect, useState} from "react";

type SearchFormPropsType = {
    value: string
    onSubmit: (searchTerm: string) => void
}
export const SearchForm = (props: SearchFormPropsType) => {
    let [tempSearch, setTempSearch] = useState('')

    useEffect(() => {
        console.log(">>> SearchForm: Set temp search: " + props.value)
        setTempSearch(props.value)
    }, [props.value])

    return (
        <div>
            <input placeholder='search' value={tempSearch} onChange={(e) => {
                setTempSearch(e.currentTarget.value)
            }}/>
            <button onClick={() => props.onSubmit(tempSearch)}>Find</button>
        </div>
    )
}