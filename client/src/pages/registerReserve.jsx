import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { mobile } from "../responsive"
import { register } from "../redux/apiCalls";
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
    width: 40%;
    padding: 20px;        
    background-color: white;
    ${mobile({width: '75%'})}
`
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`
const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0px;
`
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
`
const Error = styled.span`
    color: red;
`
const Register = () => {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();
    const {isFetching, error} = useSelector((state)=>state.user);
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleClick = (e) => {
        e.preventDefault()
        register(dispatch,{username, email, password})
    }

  return (
    <Container>
        <Wrapper>
            <Title>Регистрация</Title>
            <Form>
                <Input placeholder="Имя пользователя" onChange={(e)=>setUsername(e.target.value)}/>
                <Input placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                <Input placeholder="Пароль" onChange={(e)=>setPassword(e.target.value)}/>
                <Input placeholder="Подтвердите пароль" onChange={(e)=>setConfirmPassword(e.target.value)}/>
                <Agreement>
                    Пользовательское соглашение.
                </Agreement>
                <Button onClick={handleClick} disabled={isFetching}>Регистрация</Button>
                {error && <Error>Что-то пошло не так...</Error>}
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Register