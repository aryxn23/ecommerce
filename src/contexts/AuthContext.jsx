import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [search, setSearch] = useState(false);
    const [wishlist, setWishlist] = useState(false)
    const [cart, setCart] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [currentId, setCurrentId] = useState("");
    const [user, setUser] = useState({});
    const [products, setProducts] = useState([])

    return (
        <AuthContext.Provider value={{
            loggedIn, setLoggedIn, search, setSearch, wishlist, cart, setCart, setWishlist, userEmail, setUserEmail, currentId, setCurrentId,
            user, setUser, products, setProducts
        }}>
            {children}
        </AuthContext.Provider>
    );
};
