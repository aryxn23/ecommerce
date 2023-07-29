import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx";
import Header from "components/Header/Header";
import Product from "components/Product/Product";
import Newsletter from "components/Newsletter/Newsletter";
import Footer from "components/Footer/Footer";

const CategoryPage = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
        scrollToTop();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/products`);
            const data = await response.json();
            const filteredProducts = data.filter((product) => product.category === category);
            setProducts(filteredProducts);
        } catch (error) {
            console.log("Error fetching products:", error);
        }
    };

    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };

    return (
        <div>
            <Header />
            <div className="category-title">{category}</div>
            <Product products={products} />
            <Newsletter />
            <Footer />
        </div>
    );
};

export default CategoryPage;


