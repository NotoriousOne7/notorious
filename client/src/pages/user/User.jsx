import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Announcement from "../../components/Announcement";
import Navbar from "../../components/Navbar";
import { getOrder, logout, updateUser } from "../../redux/apiCalls";
import { deleteAll } from "../../redux/cartRedux";
import "./user.css";
import { publicRequest, userRequest } from "../../requestMethods";

export default function User() {
  const user = useSelector((state) => state.user.currentUser);
  const userId = useSelector((state)=>state.user.currentUser._id);
  const orders = useSelector((state)=>state.order.orders);
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    getOrder(dispatch, userId);
  }, [dispatch]);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    const user = { ...inputs, _id: userId};
    updateUser(userId, user, dispatch);
    logout(dispatch)
    dispatch(
        deleteAll()
    );
    navigate('/')
  };

  console.log(orders)
  const columns = [
    { field: "_id", headerName: "ID заказа", width: 220 },
    {
      field: "userId", headerName: "ID пользователя", width: 200,
    },
    
  ];
  
  return (
    <div className="user">
      <Announcement/>
      <Navbar/>
      <div className="container">
      <div className="userTitleContainer">
        <h1 className="userTitle">Личный кабинет</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={user.img}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.username}</span>
              <span className="userShowUserTitle">Клиент</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Информация о пользователе</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>
            <span className="userShowTitle">Контакты</span>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Изменение информации</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Имя пользователя</label>
                <input
                  className="userUpdateInput"
                  type="text"
                  placeholder={user.username}
                  name="username"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={user.email}
                  className="userUpdateInput"
                  name="email"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={user.img}
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton"  onClick={handleClick} >Обновить</button>
            </div>
          </form>
        </div>
      </div>
      <div className="userList">
        <div className="userTitleContainer">
          <h1 className="userTitle">Заказы</h1>
        </div>
      <DataGrid
        rows={orders}
        disableSelectionOnClick
        columns={columns}
        getRowId={row=>row._id}
        pageSize={15}
        checkboxSelection
      />
    </div>
      </div>
    </div>
  );
}
