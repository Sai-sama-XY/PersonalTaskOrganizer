import axiosClient from "@/axiosClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);

    const userLogin = async () => {
        try {
            const data = { email: email, password: password };

            const response = await axiosClient.post("/loginUser", data);
            console.log(response);
            if (response.status == 200) {
                localStorage.setItem("token", response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
                setRedirect(true);
            }
        } catch (e) {
            console.error(e);
        }
    };

    if (redirect) {
        return <Navigate to="/homepage" />;
    }

    return (
        <Card className="w-[500px]">
            <CardHeader>
                <CardTitle className="text-4xl">Login</CardTitle>
            </CardHeader>
            <CardContent>
                <form
                    className="flex flex-col gap-5 items-start"
                    onSubmit={(e) => {
                        e.preventDefault();
                        userLogin();
                    }}
                >
                    <div className="flex flex-col gap-3 items-start w-full">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Label htmlFor="password">Password</Label>
                        <Input
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button
                        className="w-full"
                        type="submit"
                    >
                        Login
                    </Button>
                    <Label><Link to="/register">Don't have an Account?</Link></Label>
                    
                </form>
            </CardContent>
        </Card>
    );
}

export default Login;
