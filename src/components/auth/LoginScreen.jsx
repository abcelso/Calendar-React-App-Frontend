import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';
// import { CalendarEvent } from './../calendar/CalendarEvent';


const initialStateLogin = {
    lEmail: 'alejandro@gmail.com',
    lPassword: '123456'
}

const initialStateRegister = {
    rName: 'Alejandro',
    rEmail: 'alejandro@gmail.com',
    rPassword1: '123456',
    rPassword2: '123456'
}

export const LoginScreen = () => {


    const dispatch = useDispatch();

    const [formLoginValues, setLoginValues, handleLoginInput] = useForm(initialStateLogin);

    const { lEmail, lPassword } = formLoginValues;

    const [formRegisterValues,  setRegisterValues, handleRegisterInput] = useForm(initialStateRegister);

    const { rName, rEmail, rPassword1, rPassword2 } = formRegisterValues;


    const handleLoginSubmit = (e) => {
        e.preventDefault();

        // setLoginValues(e.target.value);

        // console.log(formLoginValues);
        dispatch(startLogin(lEmail, lPassword));
    }

    const handleRegisterSubmit = (e) => {
        e.preventDefault();

        // setRegisterValues(e.target.value);

        if (rPassword1 !== rPassword2) {
            Swal.fire('Error', 'Las contraseñas no son iguales', 'error');
        }

        dispatch(startRegister(rName, rEmail, rPassword1));
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLoginSubmit}>
                        <div className="form-group mb-1">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="lEmail"
                                value={ lEmail }
                                onChange={handleLoginInput}
                            />
                        </div>
                        <div className="form-group mb-1">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="lPassword"
                                value={ lPassword }
                                onChange={handleLoginInput}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit = { handleRegisterSubmit }>
                        <div className="form-group mb-1">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="rName"
                                value = { rName }
                                onChange = { handleRegisterInput }
                            />
                        </div>
                        <div className="form-group mb-1">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="rEmail"
                                value = { rEmail }
                                onChange = { handleRegisterInput }
                            />
                        </div>
                        <div className="form-group mb-1">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="rPassword1"
                                value = { rPassword1 }
                                onChange = { handleRegisterInput }
                            />
                        </div>

                        <div className="form-group mb-1">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name="rPassword2"
                                value = { rPassword2 }
                                onChange = { handleRegisterInput }
                            />
                        </div>

                        <div className="form-group mt-3">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
