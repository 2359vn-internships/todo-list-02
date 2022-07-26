import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button/Button";
import MainLayout from "../components/Layout/MainLayout";
import TextField from "../components/TextField";
import { H1, P } from "../components/Typography";
import { useAppDispatch } from "../redux/hooks";
import { loginSuccess } from "../redux/userSlice";
import { LoginService, RegisterService } from "../services/Auth";

const Body = styled.div`
	padding: 7rem 0;
	margin: auto;
	max-width: 21rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2rem;
`;
const auth = {
	login: {
		title: "Log In",
		button: "LOG IN",
	},
	register: {
		title: "Register",
		button: "REGISTER",
	},
};
const initAuthBody = {
	username: "",
	password: "",
};
const Auth = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [isLogin, setIsLogin] = useState(true);
	const [authBody, setAuthBody] = useState(initAuthBody);
	const handleSwitchAuth = () => {
		setIsLogin((prev) => (prev = !prev));
	};
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAuthBody({
			...authBody,
			[e.target.id]: e.target.value,
		});
	};
	const LoginHandler = () => {
		LoginService(authBody).then((data) => {
			if (data.length !== 0) {
				localStorage.setItem("user", JSON.stringify(data[0].id));
				dispatch(loginSuccess(data[0].id));
				navigate("/todo");
				return;
			}
			alert("Wrong username or password");
		});
	};
	const RegisterHandler = () => {
		RegisterService(authBody)
			.then((data) => setIsLogin(true))
			.catch(() => {
				alert("Username already exists");
			});
	};
	return (
		<MainLayout>
			<Body>
				<H1>{isLogin ? auth.login.title : auth.register.title}</H1>
				<TextField
					lines={1}
					label={"Username"}
					id={"username"}
					onChange={onChange}
					placeholder={"Enter username"}
				/>
				<TextField
					lines={1}
					label={"Password"}
					id={"password"}
					onChange={onChange}
					placeholder={"Enter password"}
				/>
				<Button width="100%" onClick={isLogin ? LoginHandler : RegisterHandler}>
					{isLogin ? auth.login.button : auth.register.button}
				</Button>
				<P onClick={handleSwitchAuth}>
					{isLogin ? auth.register.button : auth.login.button}
				</P>
			</Body>
		</MainLayout>
	);
};

export default Auth;
