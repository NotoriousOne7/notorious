import { useState } from "react";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(
        rgba(255,255,255,0.5), 
        rgba(255,255,255,0.5)
        ),
        url("https://krot.info/uploads/posts/2022-01/1642601819_28-krot-info-p-kraski-art-37.jpg") center;
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
`
const Wrapper = styled.div`
    width: 25%;
    padding: 20px;        
    background-color: white;
    ${mobile({width: '75%'})}
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
`
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`

const link = {
    margin: "5px 0",
    fontSize: "12px",
    textDecoration: "underline",
    cursor: "pointer"
}

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0;
    padding: 10px;
`
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
    &:disabled{
        color: green;
        cursor: not-allowed;
    }
`

const Error = styled.span`
    color: red;
`

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();
    const {isFetching, error} = useSelector((state)=>state.user);
    const navigate = useNavigate()

    const handleClick = (e) => {
        e.preventDefault()
        login(dispatch, {username, password})
    }
  return (
    <Container>
        <Wrapper>
            <Title>Авторизация</Title>
            <Form>
                <Input placeholder="Имя пользователя" 
                onChange={(e)=>setUsername(e.target.value)}
                />
                <Input placeholder="Пароль"
                type="password"
                onChange={(e)=>setPassword(e.target.value)}
                />
                <Button onClick={handleClick} disabled={isFetching}>Войти</Button>
                {error && <Error>Что-то пошло не так...</Error>}
                <Link  to="/register"  style={link}>Не помните пароль?</Link>
                <Link  to="/register"   style={link}>Создать новый аккаунт</Link>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Login