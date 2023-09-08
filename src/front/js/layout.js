import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { Home } from "./pages/home";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import Login from "./component/login";
import Signup from "./component/signup";
import { Profile } from "./pages/protected";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

const Layout = () => {
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/protected">
                            <Profile />
                        </Route>
                        <Route exact path="/login">
                            <Login />
                        </Route>
                        <Route exact path="/signup">
                            <Signup />
                        </Route>

                        <Route exact path="/single/:theid">
                            <Single />
                        </Route>
                        <Route>
                            <h1>Not found!</h1>
                        </Route>
                    </Switch>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);