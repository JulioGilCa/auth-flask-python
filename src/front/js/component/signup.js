import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const signupUrl = `${process.env.BACKEND_URL}/api/user`

const Signup = () => {
    const { actions } = useContext(Context);
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const history = useHistory(); // Obtiene el objeto de historial

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const submitForm = async event => {
        event.preventDefault();

        if (!data.email || !data.password) {
            Swal.fire({
                title: "Error",
                text: "Todos los campos son obligatorios.",
                icon: "error",
            });
            return;
        };

        try {
            const result = await fetch(signupUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                }),
            });
            // const result = await actions.create_user(data);
            // console.log(result);
            if (result.status === 200 || result.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'User registered successfully!, please login.',
                }).then(() => {
                    history.push("/login");
                });
            } else if (result.status === 409) {
                Swal.fire({
                    title: "Error",
                    text: "El usuario ya existe.",
                    icon: "error",
                });
            } else {
                console.log(data); // Handle the response as needed
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form className="d-flex flex-column align-items-center" onSubmit={submitForm}>
            <h1 className="text-center col-3 mb-3 fs-1 my-5 border border-warning p-4">Sign In</h1>
            <div className="mb-3 col-3 border border-warning p-3">
                <input
                    type="email"
                    className="form-control mb-3"
                    name="email"
                    id="emailInput"
                    placeholder="email"
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    className="form-control mb-3"
                    name="password"
                    id="passwordInput"
                    placeholder="Password"
                    onChange={handleInputChange}
                />
                <div className="text-center">
                    <button type="submit" className="btn btn-info mb-3">
                        Sign In
                    </button>

                    <Link to={"/login"}>
                        <span className="ms-5 btn btn-success mb-3">Login</span>
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default Signup;