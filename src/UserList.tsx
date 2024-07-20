import style from "./github.module.css";
import React, {useEffect, useState} from "react";
import {instance} from "./api";
import Preloader from "./Preloader/Preloader";

type SearchResultType = {
    items: Array<SearchUserType>
}
export type SearchUserType = {
    login: string
    id: number
    avatar_url: string
}

type UserListPropsType = {
    searchTerm: string
    selectedUser: SearchUserType | null
    setSelectedUser: (user: SearchUserType) => void
}
const UserList: React.FC<UserListPropsType> = ({searchTerm, selectedUser, setSelectedUser}) => {
    const [users, setUsers] = useState<Array<SearchUserType>>([])
    const [isFetching, setIsFetching] = useState(true)

    useEffect(() => {
        console.log(">>> UserList: Search users: " + searchTerm)
        instance.get<SearchResultType>(`search/users?q=${searchTerm}`).then(res => {
            setUsers(res.data.items)
            setIsFetching(false)
        })
        return () => {
            setIsFetching(true)
        }
    }, [searchTerm])


    return <div>
        {isFetching ? <Preloader/> :
            <div>
                <ul>
                    {users.map(u => <li key={u.id} className={selectedUser === u ? style.selected : ""}
                                        onClick={() => {
                                            setSelectedUser(u)
                                        }}> {u.login} </li>)}
                </ul>
            </div>
        }
    </div>
}

export default UserList