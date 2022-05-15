import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import FormInput from "../components/formInput/FormInput";
import { register } from "../redux/apiCalls";

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: linear-gradient(
        rgba(255, 255, 255, 0.7),
        rgba(255, 255, 255, 0.3)
      ),
      url("https://images.pexels.com/photos/114979/pexels-photo-114979.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500");
    background-size: cover;
    background-position: center;
  `
  
const Form = styled.div`
      background-color: white;
      padding: 0px 60px;
      border-radius: 10px;
  `
  
const Title = styled.div`
      font-size: 50px;
      margin-top: 10px;
      color: rgb(77, 1, 77);
      text-align: center;
  `
  
const Button = styled.div`
      display: flex;
      align-items: center;
      justify-content: center;
      width: 94%;
      height: 50px;
      padding: 10px;
      border: none;
      background-color: rebeccapurple;
      color: white;
      border-radius: 5px;
      font-weight: bold;
      font-size: 18px;
      cursor: pointer;
      margin-top: 15px;
      margin-bottom: 30px;
  `

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const {isFetching, error} = useSelector((state)=>state.user);

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "John252",
      errorMessage:
        "Имя пользователя должно состоять из 3-16 символов, и не должно содержать специальных символов!",
      label: "Имя пользователя",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "john@gmail.com",
      errorMessage: "Введите правильный почтовый адрес!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "qwerty12345!",
      errorMessage:
        "Длина пароля должна быть от 8 до 20 символов, также содержать минимум 1 букву, 1 цифру и 1 специальный символ!",
      label: "Пароль",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "qwerty12345!",
      errorMessage: "Пароли не совпадают!",
      label: "Подтвердите пароль",
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleClick = (e) => {
    e.preventDefault();
    register(dispatch, values)
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <Container>
        <Form onSubmit={handleSubmit}>
            <Title>Регистрация</Title>
            {inputs.map((input) => (
                <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
                />
                ))}
            <Button onClick={handleClick}>Зарегистрироваться</Button>
        </Form>
    </Container>
  );
};

export default Register;
