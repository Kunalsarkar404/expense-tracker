import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ isSignup }) => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const authMutation = useMutation({
        mutationFn: async () => {
            const url = isSignup ? "/api/auth/signup" : "/api/auth/login";
            const response = await axios.post(url, formData, { withCredentials: true });
            return response.data;
        },
        onSuccess: () => {
            navigate("/dashboard");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        authMutation.mutate();
    };

    return (
        <div className="max-w-sm mx-auto bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">{isSignup ? "Sign Up" : "Login"}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="border p-2 w-full mb-2 rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="border p-2 w-full mb-2 rounded"
                />
                <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded">
                    {isSignup ? "Sign Up" : "Login"}
                </button>
            </form>
            <p className="mt-2 text-sm">
                {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
                <a href={isSignup ? "/login" : "/signup"} className="text-blue-500">
                    {isSignup ? "Login" : "Sign Up"}
                </a>
            </p>
        </div>
    );
};

export default AuthForm;