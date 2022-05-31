import React, { Fragment } from "react";

import {
  Link, useLocation,
  useNavigate,
  useParams
} from "react-router-dom";
import { isAuthenticated, logout } from "../../helpers/auth";
import { getLocalStorage } from "../../helpers/localStorage";
import { useSelector, useDispatch } from "react-redux";
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons';

import "./Header.css"
const Header = () => {
  let history = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ ...state }));


  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    window.localStorage.removeItem("user");
    history("/");
  };

  return (
    <div className="home__header  ">


      <div className="home__header__left">
        <div className="home__header__left__img">
          <img src="/images/users/moh.png" alt="" />
        </div>
        <img className='home__header__left__head' src="/images/logo/logo1.png" alt="" />
      </div>


      <div className="home__header__right">



        {auth?.user.role == 0 && (
          <Link className="nav-link" to="/user/dashboard">
            Dashboard
          </Link>
        )}
        {auth?.user.role == 3 && (
          <Link className="nav-link" to="/admin/dashboard">
            Dashboard
          </Link>
        )}

        {auth !== null && (
          <a className="nav-link pointer" href="/" onClick={logout}>
            Logout
          </a>
        )}

        {auth === null && (
          <>



            <Link className="nav-link" to="/doctor/login">
              <MailOutlined />
              <span className="nav-link__text">Doctors</span>

            </Link>
            {/*  <Link className="nav-link" to="#">
              <LoginOutlined />
              <span className="nav-link__text">Hospitals</span>

            </Link> */}
            {/*  <Link className="nav-link" to="/customerservice/login">
              <LoginOutlined />
              <span className="nav-link__text">Customer Service</span>

            </Link> */}
            <Link className="nav-link" to="/login">
              <LoginOutlined />
              <span className="nav-link__text">Login</span>
            </Link>
            <Link className="nav-link" to="/signup">
              <UserAddOutlined />
              <span className="nav-link__text">Register</span>

            </Link>
            {/*   <Menu.Item key="21" icon={<MailOutlined />}>
                Doctors
              </Menu.Item>
              <Menu.Item key="22" icon={<MailOutlined />}>
                Hospitals
              </Menu.Item>
              <Menu.Item key="23" icon={<LoginOutlined />}>
                Login
              </Menu.Item>
              <Menu.Item key="24" icon={<UserAddOutlined />}>
                Register
              </Menu.Item> */}

          </>
        )}

      </div>
    </div>
  );
};


export default Header;