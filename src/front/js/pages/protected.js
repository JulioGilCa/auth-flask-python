import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Profile = () => {

    const token = sessionStorage.getItem("token");
    const imageUrl = "https://img.freepik.com/premium-vector/login-access-denied-vector-illustration-system-refuses-password-error-entry-computer-device-showing-user-does-have-permission-website-mobile-development_2175-1275.jpg"
    const accessUrl = "https://images.squarespace-cdn.com/content/v1/5ec11e7c3afc284131735f05/1619780776861-HDVMTO6YI43FFRIQNYP6/Si.png"

    return (
        <div>
            {token && token !== "" && token !== "undefined" ? (
                <>
                    <div className="alert alert-success text-center" role="alert">
                        <h2>Bienvenido/a, estas en la zona restringida</h2>

                    </div>
                    <div className="d-flex flex-column align-items-center">
                        <img src={accessUrl} alt="access" width={400} />
                    </div>
                </>
            ) : (
                <>
                    <div className="alert alert-danger text-center" role="alert">
                        <h1>Es una pagina restringida, logueate</h1>

                    </div>
                    <div className="d-flex flex-column align-items-center">
                        <img src={imageUrl} alt="denied" width={600} />
                        <Link to={"/login"}>
                            <span className="btn btn-success mb-5">Login</span>
                        </Link>
                    </div>
                </>
            )}
        </div>
    )
}