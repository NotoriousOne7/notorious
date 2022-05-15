import { Add, Remove } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";
import { deleteAll } from "../redux/cartRedux";
import { addOrder } from "../redux/apiCalls";


const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  ${mobile({ alignItems: "center" })}
`;

const TopButton = styled.button`
  width: 150px;
  height: 70px;
  padding: 10px;
  margin: 0px 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  ${mobile({width:"45%" })}
  ${mobile({height:"100%" })}
`;
const MidButton = styled.button`
  width: 150px;
  height: 70px;
  margin: 0px 10px;
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  ${mobile({width:"45%" })}
  ${mobile({height:"100%" })}
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
  
`;

const Info = styled.div`
  flex: 3;
  margin-left: 100px;
  ${mobile({ margin: "0px" })}
`;

const Product = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  ${mobile({ flexDirection: "column" })}
  ${mobile({ alignItems: "center" })}
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;
const Inputs = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const Input = styled.input`
  padding: 5px;
  margin: 5px 0px;
  border-radius: 5px;
  border: 1px solid gray;
`

const Cart = () => {
    const quantity = useSelector((state)=>state.cart.quantity);
    const products = useSelector((state)=>state.cart.products);
    const total = useSelector((state)=>state.cart.total-500);
    const [inputs, setInputs] = useState({});
    const userId = useSelector((state)=>state.user.currentUser._id);
    const cart = useSelector((state)=>state.cart);
    const [stripeToken, setStripeToken] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();  
    
    const onToken = (token) => {
        setStripeToken(token);
    }
    /*const handleQuantity = (type) => {
        if(type === "dec"){
            quantity > 1 && setQuantity(quantity - 1);
        } else {
            setQuantity(quantity + 1);
        }
    };*/

    /*useEffect(()=>{
        const makeRequest = async ()=>{
            try{
                const res = await userRequest.post("/checkout/payment", {
                    tokenId: stripeToken.id,
                    amount: 500,
                });
                navigate("/success", {state:res.data});
            }catch{}
        };
        stripeToken && cart.total>=1 && makeRequest();
    }, [stripeToken, cart.total, navigate]);*/
    const handleChange = (e) => {
      setInputs((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    };

    const handleDelete = (e) => {
      e.preventDefault()
      dispatch(
          deleteAll()
      );
    };

    const handleOrder = (e) => {
      e.preventDefault();
      const order = {userId:userId, products:products, total:total, ...inputs};
      addOrder(order);
      alert("Заказ успешно создан!");
    };

  return (
    <Container>
        <Navbar/>
        <Announcement/>
        <Wrapper>
            <Title>Ваша корзина</Title>
            <Top>
                <TopButton>Продолжить покупки</TopButton>
                <MidButton onClick={handleDelete}>Очистить корзину</MidButton>
                
            </Top>
            <Bottom>
                <Info>
                <Hr/>
                    {cart.products.map((product)=>(
                        <Product>
                            <ProductDetail>
                                <Image src ={product.img}/>
                                <Details>
                                    <ProductName><b>Наименование:</b>{product.title}</ProductName>
                                    <ProductId><b>ID:</b>{product._id}</ProductId>
                                    <ProductColor color={product.color}/>
                                    <ProductSize><b>Размер:</b>{product.size}</ProductSize>
                                </Details>
                            </ProductDetail>
                            <PriceDetail>
                                <ProductAmountContainer>
                                    <Add />
                                    <ProductAmount>{product.quantity}</ProductAmount>
                                    <Remove/>
                                </ProductAmountContainer>
                                <ProductPrice>{product.price * product.quantity} тенге</ProductPrice>
                            </PriceDetail>
                        </Product>
                        ))}
                    <Hr/>
                </Info>
                
                <Summary>
                    <SummaryTitle>Общий заказ</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemText>Сумма</SummaryItemText>
                        <SummaryItemPrice>{cart.total} тенге</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Доставка</SummaryItemText>
                        <SummaryItemPrice>1000 тенге</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Скидка</SummaryItemText>
                        <SummaryItemPrice>-500 тенге</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem type="total">
                        <SummaryItemText>В общем</SummaryItemText>
                        <SummaryItemPrice>{cart.total-500} тенге</SummaryItemPrice>
                    </SummaryItem>
                      <Inputs>
                        <ProductName>Как вас зовут ?</ProductName>
                        <Input name="customerName" onChange={handleChange}></Input>
                        <ProductName>Ваш номер телефона ?</ProductName>
                        <Input name="phoneNumber" onChange={handleChange}></Input>
                        <ProductName>Адрес доставки? ?</ProductName>
                        <Input name="address" onChange={handleChange}></Input>
                      </Inputs>
                        <Button onClick={handleOrder}>ЗАКАЗАТЬ СЕЙЧАС</Button>
                </Summary>
            </Bottom>
        </Wrapper>
        <Footer/>
    </Container>
  )
}

export default Cart