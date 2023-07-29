import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import SearchItem from './SearchItem.jsx';
import { AuthContext } from '../../contexts/AuthContext';
import CloseIcon from '@mui/icons-material/Close';
import "../Search/search.css";

const Search = () => {

    const navigate = useNavigate();

    const { search, setSearch } = useContext(AuthContext);
    const { currentId, setCurrentId } = useContext(AuthContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            // const response = await fetch("http://localhost:4000/products");
            const response = await fetch(`${process.env.REACT_APP_URL}/products`);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.log("Error fetching products:", error);
        }
    };

    const handleClick = () => {
        setSearch(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Search query:", searchQuery);
    }

    const handleChange = (event) => {

        setSearchQuery(event.target.value);

        const tempData = products.filter((product) => {
            return product.name.toLowerCase().includes(event.target.value.toLowerCase());
        });

        setFilteredProducts(tempData);

        if (event.target.value === "") {
            setFilteredProducts([]);
        }
    }

    const getItem = (productId) => {
        setCurrentId(productId)
        // console.log("ProductId: " + productId);
        navigate(`/product/${productId}`);
        setSearch(false);
    }

    return (
        <>
            {search && (

                <div className="full-screen">

                    <div className="animated-div">

                        <div className="search-bar">

                            <form onSubmit={handleSubmit}>
                                <input type="text" placeholder="SEARCH FOR PRODUCTS" onChange={handleChange} />
                            </form>

                            <CloseIcon onClick={handleClick} fontSize='large' />

                        </div>

                        <div className="container-items">

                            {filteredProducts.map((product) => (
                                <SearchItem
                                    key={product._id}
                                    imageUrl={product.imageUrl}
                                    title={product.name}
                                    description={product.description}
                                    onClick={() => getItem(product._id)}
                                />
                            ))}
                        </div>

                    </div>

                </div>

            )}
        </>
    );
}

export default Search;


