import { Badge } from '@material-ui/core'
import { Search, ShoppingCartOutlined } from '@material-ui/icons'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { logout } from '../redux/apiCalls'
import { deleteAll } from '../redux/cartRedux'
import {mobile} from '../responsive'


const Container = styled.div`  
    height: 60px;
    ${mobile({height: '50px'})}  
`
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
`
const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`
const Language = styled.span`
    font-size: 14px;
    cursor: pointer;    
    ${mobile({display: 'none'})}
`
const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`
const Input = styled.input`
    border: none;
    ${mobile({width: '40px'})}
`
const Center = styled.div`
    flex: 1;
    text-align: center;
`
const Logo = styled.h1`
    font-weight: bold;
    font-style: italic;
    ${mobile({fontSize: '20px'})}
`
const Right = styled.div`
    flex: 1; 
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({flex: 2, justifyContent: 'center'})}
`
const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    text-decoration: none; /*убираем подчеркивание текста ссылок*/
    background: teal; /*добавляем фон к пункту меню (заменив этот параметр, вы поменяете цвет всех пунктов меню)*/
    color:#fff; /*меняем цвет ссылок*/
    padding: 0px 15px; добавляем отступ
    
    font-family: arial; /*меняем шрифт*/
    line-height:40px; /*ровняем меню по вертикали*/
    
    border-right: 1px solid black; /*добавляем бордюр справа*/
    -moz-transition: all 0.3s 0.01s ease; /*делаем плавный переход*/
    -o-transition: all 0.3s 0.01s ease;
    -webkit-transition: all 0.3s 0.01s ease;
    }
    &:hover {
    background:black;/*добавляем эффект при наведении*/
    }
    ${mobile({padding: '0px 10px', fontSize: '12px', marginLeft:'10px'})}
`
const StyledLogoLink = styled(Link)`
    color: black;
    text-decoration: none;
`
const StyledLink = styled(Link)`
    font-size: 14px;
    cursor: pointer;
    text-decoration: none; /*убираем подчеркивание текста ссылок*/
    background: teal; /*добавляем фон к пункту меню (заменив этот параметр, вы поменяете цвет всех пунктов меню)*/
    color:#fff; /*меняем цвет ссылок*/
    padding: 0px 15px; добавляем отступ
    
    font-family: arial; /*меняем шрифт*/
    line-height:40px; /*ровняем меню по вертикали*/
    
    border-right: 1px solid black; /*добавляем бордюр справа*/
    -moz-transition: all 0.3s 0.01s ease; /*делаем плавный переход*/
    -o-transition: all 0.3s 0.01s ease;
    -webkit-transition: all 0.3s 0.01s ease;
    }
    &:hover {
    background:black;/*добавляем эффект при наведении*/
    }
    ${mobile({padding: '0px 10px', fontSize: '12px', marginLeft:'10px'})}
`;
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 10px 15px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
    &:disabled{
        color: green;
        cursor: not-allowed;
    }
`

const Navbar = () => {
    const dispatch = useDispatch();
    const {isFetching, error} = useSelector((state)=>state.user);
    const user = useSelector((state) => state.user.currentUser);
    const navigate = useNavigate();
    const handleClick = (e) => {
        e.preventDefault()
        logout(dispatch)
        dispatch(
            deleteAll()
        );
        navigate('/')
    }
    const quantity = useSelector(state=>state.cart.quantity)
  return (
      <>{user ? (
        <Container>
        <Wrapper>
        <Left>
            <Language>RU</Language>
        </Left>
        <Center><StyledLogoLink to="/"><Logo>ECOp.</Logo></StyledLogoLink></Center>
        <Right>
            <StyledLink to='/profile'>Здравствуйте, {user.username}!</StyledLink>
            <MenuItem onClick={handleClick}>Выйти</MenuItem>
            <StyledLink to="/cart">
                    <Badge badgeContent={quantity} color="primary">
                    <ShoppingCartOutlined />
                    </Badge>
            </StyledLink>
        </Right>
        </Wrapper>
    </Container>
      ) : (
        <Container>
        <Wrapper>
        <Left>
            <Language>RU</Language>
            
        </Left>
        <Center><Logo>ECOp.</Logo></Center>
        <Right>
            <StyledLink to="/register">
                Регистрация
            </StyledLink>
            <StyledLink to="/login">
                Войти
            </StyledLink>
            <StyledLink to="/login">
                <MenuItem>
                    <Badge badgeContent={quantity} color="primary">
                    <ShoppingCartOutlined />
                    </Badge>
                </MenuItem>
            </StyledLink>
        </Right>
        </Wrapper>
    </Container>
      )}
      </>
  )
}

export default Navbar;