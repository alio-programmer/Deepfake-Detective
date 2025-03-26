import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import Header from "./Components/Header.jsx";
import Footer from "./Components/Footer.jsx";
import { SignIn, SignUp, useUser } from "@clerk/clerk-react";

const Home = lazy(() => import("./Home/Home.jsx"));
const Login = lazy(() => import("./Login/Login.jsx"));
const Signup = lazy(() => import("./Signup/Signup.jsx"));
const Public = lazy(() => import("./Public Page/Public.jsx"));

function ProtectedRoute({ children }) {
    const { isSignedIn } = useUser();

    if (!isSignedIn) {
        return <Navigate to="/public" replace />;
    }

    return children;
}

function App() {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <Routes>
                    <Route path="/" element={<Navigate to="/public" replace />} />
                    <Route path="/public" element={<Public />} />
                    <Route path="/login" element={<SignIn routing="path" path="/login" />} />
                    <Route path="/signup" element={<SignUp routing="path" path="/signup" />} />
                    <Route
                        path="/home"
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
                <Footer />
            </Suspense>
        </Router>
    );
}

export default App;
