import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useUpdateProfileMutation } from "../src/slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { setCredentials } from "../src/slices/authSlice";

const ProfilePage: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { userInfo } = useSelector((state: any) => state.auth);

    const [updateProfile, { isLoading }] = useUpdateProfileMutation();

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, [userInfo.name, userInfo.email]);

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
        } else {
            try {
                const res = await updateProfile({
                    _id: userInfo.id,
                    name,
                    email,
                    password,
                }).unwrap();
                dispatch(setCredentials({ ...res }));
                toast.success("Profile Updated!");
            } catch (err: any) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    return (
        <FormContainer>
            <h1>Update Profile</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label className="mt-3">Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label className="mt-3">Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label className="mt-3">Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="confirmPassword">
                    <Form.Label className="mt-3">Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>

                {isLoading && <Loader />}
                <Button type="submit" variant="primary" className="mt-3">
                    Update
                </Button>
            </Form>
        </FormContainer>
    );
};

export default ProfilePage;
