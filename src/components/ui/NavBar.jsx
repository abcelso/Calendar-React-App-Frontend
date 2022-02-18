import React from 'react';

export const NavBar = () => {
    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <div className='container-fluid'>
                <a className='navbar-brand' href='#'>
                    Navbar
                </a>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarTogglerDemo03'
                    aria-controls='navbarTogglerDemo03'
                    aria-expanded='false'
                    aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div
                    className='collapse navbar-collapse'
                    id='navbarTogglerDemo03'>
                    <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                        <li className='nav-item'>
                            <a
                                className='nav-link active'
                                aria-current='page'
                                href='#'>
                                Home
                            </a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' href='#'>
                                Link
                            </a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link disabled'>Disabled</a>
                        </li>
                    </ul>
                    <form className='d-flex'>
                        <button
                            className='btn btn-outline-danger'
                            type='submit'>
                            <i className="fas fa-sign-out-alt" aria-hidden="true"></i>
                            <span> Salir</span>
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    );
};
