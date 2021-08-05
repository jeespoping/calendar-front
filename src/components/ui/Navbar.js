import React from 'react'

export default function Navbar() {
    return (
        <div className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand">
                Jesus
            </span>
            <button className="btn btn-outline-danger">
                <i className="fa fa-sign-out-alt"></i>
                <span> Salir</span>
            </button>
        </div>
    )
}
