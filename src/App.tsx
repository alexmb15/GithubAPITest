import React, {useEffect, useState} from 'react';
import style from './github.module.css'
import UserList, {SearchUserType} from "./UserList";
import {SearchForm} from "./SearchForm";
import UserDetails from "./UserDetails";


function GitHubApp() {
    const initialValue = 'alexmb'
    let [searchTerm, setSearchTerm] = useState(initialValue)
    let [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null)

    useEffect(() => {
        console.log(">>> App: Selected user: set document title: " + selectedUser?.login)
        if(!!selectedUser){
            document.title = selectedUser.login
        }
    }, [selectedUser])

    return (
        <div className={style.container}>
            <div>
                <SearchForm value={searchTerm}
                            onSubmit={setSearchTerm /*(value) => {setSearchTerm(value)}*/}/>
                <button onClick={() => setSearchTerm(initialValue)}>Reset</button>
                <UserList searchTerm={searchTerm}
                          selectedUser={selectedUser}
                          setSelectedUser={setSelectedUser /*(user) => setSelectedUser(user)*/}
                />
            </div>
                <UserDetails selectedUser={selectedUser}/>

        </div>
    );
}

export default GitHubApp;
