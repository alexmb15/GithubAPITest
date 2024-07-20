import React, {useEffect, useState} from "react";
import {instance} from "./api";
import {SearchUserType} from "./UserList";
import {Timer} from "./Timer";
import Preloader from "./Preloader/Preloader";

type UserType = {
    login: string
    id: number
    avatar_url: string
    followers: number
}

type UserDetailsPropsType = {
    selectedUser: SearchUserType | null
}

const initialTimer = 10
const UserDetails: React.FC<UserDetailsPropsType> = ({selectedUser}) => {
    const [userDetails, setUserDetails] = useState<UserType | null>(null)
    const [timer, setTimer] = useState(initialTimer)
    const [isFetching, setIsFetching] = useState(false)

    useEffect( () => {
        console.log(">>> UserDetails: Selected user: get user data: " + selectedUser?.login)
        if (!!selectedUser) {
            setIsFetching(true)
            instance.get<UserType>(`users/${selectedUser.login}`).then(res => {
                setTimer(initialTimer)
                setUserDetails(res.data)
                setIsFetching(false)
                console.log("isFetching = " + isFetching)
            })
        }
        return () => {setIsFetching(false)}
    }, [selectedUser])

    useEffect(() => {
        if(timer < 1)
            setUserDetails(null)
    }, [timer])

    if (isFetching){
        return <Preloader/>
    }

    return (
        <div>
            {userDetails && <>
                    <Timer initialTimer={timer} onChange={setTimer} userId={userDetails.id} />
                    <h2>{userDetails.login}</h2>
                    <img src={userDetails.avatar_url} alt='avatar'/>
                    <div>Followers: {userDetails.followers}</div>
                </>

            }
        </div>
    )
}

export default UserDetails