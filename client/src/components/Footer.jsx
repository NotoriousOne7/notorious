import { Facebook, Instagram, MailOutline, Phone, Room, Twitter } from '@material-ui/icons'
import styled from 'styled-components'
import { mobile } from '../responsive'

const Container = styled.div`
    display: flex;
    margin: 0 15%;
    ${mobile({margin: '0', flexDirection: 'column'})}
`
const Left = styled.div`
    width: 40%;
    display: flex;
    flex-direction: column;
    padding: 20px;
    ${mobile({width: '85%'})}
`
const Logo = styled.h1``
const Desc = styled.p`
    margin: 20px 0px;
`
const SocialContainer = styled.div`
    display: flex;
`
const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${props=>props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`

const Center = styled.div` 
    width: 40%;
    padding: 20px;
    ${mobile({display: 'none'})}
`
const Title = styled.h3`
    margin-bottom: 30px;
`
const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`
const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
`
const Right = styled.div`
    width: 20%;
    padding: 20px; 
    ${mobile({backgroundColor:'#fff8f8', width: '85%'})}
`
const ContactItem = styled.div`
    margin-bottom: 10px;
    display: flex;
    align-items: center;
`
const Payment = styled.img`
    width: 20%;
    ${mobile({width: '60%'})}
`
const Footer = () => {
  return (
    <Container>
        <Left>
            <Logo>ECO paints</Logo>
            <Desc>
                Продажа различных видов строительных красок
            </Desc>
            <SocialContainer>
                <SocialIcon color="3B5999">
                    <Facebook/>
                </SocialIcon>
                <SocialIcon color="E4405F">
                    <Instagram/>
                </SocialIcon>
                <SocialIcon color="55ACEE">
                    <Twitter/>
                </SocialIcon>
            </SocialContainer>
        </Left>
        <Center>
            <Title>Полезные ссылки</Title>
            <List>
                <ListItem>Домой</ListItem>
                <ListItem>Корзина</ListItem>
                <ListItem>Мой аккаунт</ListItem>
                <ListItem>Отслеживание заказа</ListItem>
                <ListItem>Соглашение</ListItem>
            </List>
        </Center>
        <Right>
            <Title>Контакты</Title>
            <ContactItem><Room style={{marginRight:'10px'}}/>
                Адрес, улица Пушкина 1
            </ContactItem>
            <ContactItem><Phone style={{marginRight:'10px'}}/>
                +7 777 777 777
            </ContactItem>
            <ContactItem><MailOutline style={{marginRight:'10px'}}/>
                temirlan@gmail.com
            </ContactItem>
            <Payment src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0NQe_h0t3U9B0R9Vl4yXkp0GI6XBPCIESQ7SNmVtJsuKkYDI5LcalPRCaworsb2MVcw&usqp=CAU'/>
        </Right>
    </Container>
  )
}

export default Footer