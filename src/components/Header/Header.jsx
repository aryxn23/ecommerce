import React, { useState, useEffect, useContext } from 'react';
import Search from '../Search/Search.jsx';
import Wishlist from '../Wishlist/Wishlist.jsx';
import Cart from "../Cart/Cart.jsx";
import { AuthContext } from '../../contexts/AuthContext';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import { IconContext } from 'react-icons';
import { TbSearch } from "react-icons/tb";
import { CgShoppingCart } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import "../Header/header.css";

const Header = () => {

    const [sidebar, setSidebar] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const { loggedIn, setLoggedIn } = useContext(AuthContext);
    const { search, setSearch } = useContext(AuthContext);
    const { wishlist, setWishlist } = useContext(AuthContext)
    const { cart, setCart } = useContext(AuthContext);
    const { userEmail, setUserEmail } = useContext(AuthContext);
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const showSidebar = () => setSidebar(!sidebar);

    useEffect(() => {

        async function fetchData() {
            try {
                const response = await fetch(`${process.env.REACT_APP_URL}/user?email=${userEmail}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                } else {
                    alert('Error occurred while fetching data');
                }
            } catch (error) {
                alert('Error occurred while fetching data');
            }
        }

        if (userEmail) {
            fetchData();
        }

    }, [userEmail]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_URL}/profile`, {
            credentials: "include"
        }).then(response => {
            response.json().then(userInfo => {
                if (userInfo.email) {
                    const email = userInfo.email;
                    setUserEmail(email);
                    setLoggedIn(true);
                } else {
                    console.log("User verification failed");
                }
            });
        });
    }, []);

    useEffect(() => {

        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            const visible = prevScrollPos > currentScrollPos || currentScrollPos === 0;

            setVisible(visible);
            setPrevScrollPos(currentScrollPos);
        };


        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos, visible]);

    const handleClick = () => {
        fetch(`${process.env.REACT_APP_URL}/logout`, {
            credentials: "include",
            method: "POST"
        })
            .then(() => {
                setLoggedIn(false);
                setUserEmail("");
                setUser({});
                navigate("/");
            });
    }

    const handleSearch = () => {
        setSearch(true);
    }

    const handleWishlist = () => {
        if (!loggedIn)
            return alert("Login First!");

        setWishlist(true)
    }

    const handleCart = () => {
        // if (!loggedIn)
        //     return alert("Login First!");

        setCart(true);
        console.log("cart: " + cart);
    }

    const filteredSidebarData = loggedIn
        ? SidebarData.filter(item => item.title !== "Sign In" && item.title !== "Sign Up")
        : SidebarData.filter(item => item.title !== "Sign Out");

    return (
        <>

            {search && (<Search />)}

            {wishlist && (<Wishlist />)}

            {cart && (<Cart />)}

            <IconContext.Provider value={{ color: '#fff' }}>
                <div className={`navbar ${visible ? 'visible' : 'hidden'}`}>

                    <Link to='#' className='menu-bars'>
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                    <div className="center" style={{ color: "white" }} onClick={() => navigate("/")}>
                        AUDIOVERSE.
                    </div>
                    <div className="right">
                        <TbSearch onClick={handleSearch} />
                        <AiOutlineHeart onClick={handleWishlist} />
                        <CgShoppingCart onClick={handleCart} />
                    </div>
                </div>

                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <li className='navbar-toggle'>
                            <Link to='#' className='menu-bars'>
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        {filteredSidebarData.map((item, index) => {
                            if (item.title === 'Sign Out') {
                                return (
                                    <li key={index} className={item.cName} onClick={handleClick}>
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                );
                            } else {
                                return (
                                    <li key={index} className={item.cName}>
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                );
                            }
                        })}
                    </ul>
                </nav>

            </IconContext.Provider>
        </>
    );
}

export default Header;



// 5 4 8
// 2 5 7
//     5 
