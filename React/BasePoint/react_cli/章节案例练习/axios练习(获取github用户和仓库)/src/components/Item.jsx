import React from 'react'

export default function Item({user}) {

    return (
        <div className="card" key={user.id}>
            <a href={user.html_url} target="_blank" rel="noreferrer">
                <img src={user.avatar_url} alt="" style={{ width: 100 }} />
            </a>
            <p className="card-text">{user.login}</p>
        </div>
    )
}
