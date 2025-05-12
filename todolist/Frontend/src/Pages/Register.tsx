import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axiosClient from "@/axiosClient";

function Register() {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const registerUser = async () => {
        if (userPassword !== confirmPassword) {
            console.log("Passwords Do Not Match!");
        } else {
            try {
                const data = {
                    name: userName,
                    email: userEmail,
                    password: userPassword,
                };

                const response = await axiosClient.post("/createUser", data);
                console.log(response.status);

                if (response.status === 200) {
                    setRedirect(true);
                }
            } catch (error) {
                console.error;
            }
        }
    };

    if (redirect) {
        return <Navigate to="/login" />;
    }
    return (
        <Card className="w-[500px]">
            <CardHeader>
                <CardTitle>
                    <h1>Register Here!</h1>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                <form className="flex flex-col gap-5">
                    <Label htmlFor="name" className="text-white">
                        Name
                    </Label>
                    <Input
                        id="name"
                        placeholder="Name"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setUserEmail(e.target.value)}
                    />
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        onChange={(e) => setUserPassword(e.target.value)}
                    />
                    <Label htmlFor="confirmpassword">Confirm Password</Label>
                    <Input
                        id="confirmpassword"
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-5">
                <Link to="/login">
                    <h1>Already a Registered User?</h1>
                </Link>
                <Button
                    className="w-full h-10 "
                    type="submit"
                    onClick={registerUser}
                >
                    Register
                </Button>
            </CardFooter>
        </Card>
    );
}

export default Register;
