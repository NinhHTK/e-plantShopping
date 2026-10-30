import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react';
import { addItem } from './CartSlice';
import './ProductList.css'; // hoặc App.css tùy dự án của bạn

function ProductList({ onContinueShopping }) {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const [addedToCart, setAddedToCart] = useState({});

    // Mảng dữ liệu chứa ít nhất 3 danh mục, mỗi danh mục ít nhất 6 cây
    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night, improving air quality.", cost: "15" },
                { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene from the air.", cost: "12" },
                { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lily-4269365_1280.jpg", description: "Removes mold spores and purifies indoor air.", cost: "18" },
                { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", description: "Adds humidity and cleans toxic air pollutants.", cost: "20" },
                { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/plant-4850669_1280.jpg", description: "Easy to grow and effective at removing toxins.", cost: "22" },
                { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/18/14/aloe-vera-3284666_1280.jpg", description: "Soothes burns and purifies air from chemicals.", cost: "10" }
            ]
        },
        {
            category: "Aromatic Fragrant Plants",
            plants: [
                { name: "Lavender", image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba", description: "Calming scent, helps reduce stress and anxiety.", cost: "20" },
                { name: "Jasmine", image: "https://images.unsplash.com/photo-1592729800077-ac7542293750", description: "Sweet fragrance, promotes relaxation.", cost: "18" },
                { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Invigorating aroma, ideal for culinary use.", cost: "15" },
                { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/07/09/05/mint-1125828_1280.jpg", description: "Refreshing scent, great for teas and cooking.", cost: "10" },
                { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2015/07/02/21/55/lemon-balm-829821_1280.jpg", description: "Citrusy aroma, helps relieve stress.", cost: "12" },
                { name: "Hyacinth", image: "https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110722_1280.jpg", description: "Beautiful spring blooms with rich scent.", cost: "22" }
            ]
        },
        {
            category: "Low Maintenance Plants",
            plants: [
                { name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361", description: "Thrives in low light and requires minimal water.", cost: "25" },
                { name: "Pothos", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b", description: "Fast-growing vine that tolerates neglect.", cost: "14" },
                { name: "Cast Iron Plant", image: "https://cdn.pixabay.com/photo/2014/10/22/17/28/plant-498525_1280.jpg", description: "Extremely resilient, survives harsh conditions.", cost: "28" },
                { name: "Succulents", image: "https://cdn.pixabay.com/photo/2016/11/21/16/05/cacti-1846147_1280.jpg", description: "Stores water, perfect for dry environments.", cost: "8" },
                { name: "Jade Plant", image: "https://cdn.pixabay.com/photo/2016/03/09/09/20/succulent-1245782_1280.jpg", description: "Symbol of good luck, low water requirement.", cost: "16" },
                { name: "Chinese Evergreen", image: "https://cdn.pixabay.com/photo/2018/06/10/18/12/aglaonema-3466988_1280.jpg", description: "Tolerates poor light and dry air.", cost: "20" }
            ]
        }
    ];

    // Tính tổng số lượng mặt hàng trong giỏ hàng cho Navbar
    const calculateTotalQuantity = () => {
        return cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
    };

    const handleAddToCart = (product) => {
        dispatch(addItem(product));
        setAddedToCart((prevState) => ({
            ...prevState,
            [product.name]: true,
        }));
    };

    return (
        <div>
            {/* Navbar Component */}
            <nav className="navbar">
                <div className="navbar-brand">
                    <h2>Paradise Nursery</h2>
                </div>
                <div className="navbar-links">
                    <a href="#plants" onClick={onContinueShopping}>Plants</a>
                    <a href="#cart" className="cart-icon-container">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="IconChangeColor" height="40" width="40">
                            <rect width="256" height="256" fill="none"></rect>
                            <circle cx="80" cy="216" r="12"></circle>
                            <circle cx="184" cy="216" r="12"></circle>
                            <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,180,176H84a15.9,15.9,0,0,1-15.3-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" fill="none" stroke="#faf9f9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" id="mainIconPathAttribute"></path>
                        </svg>
                        <span className="cart-quantity">{calculateTotalQuantity()}</span>
                    </a>
                </div>
            </nav>

            {/* Product Grid */}
            <div className="product-grid">
                {plantsArray.map((category, index) => (
                    <div key={index} className="category-section">
                        <h1 className="category-title">{category.category}</h1>
                        <div className="product-list">
                            {category.plants.map((plant, plantIndex) => (
                                <div className="product-card" key={plantIndex}>
                                    <img className="product-image" src={plant.image} alt={plant.name} />
                                    <div className="product-title">{plant.name}</div>
                                    <div className="product-description">{plant.description}</div>
                                    <div className="product-cost">${plant.cost}</div>
                                    <button
                                        className="product-button"
                                        onClick={() => handleAddToCart(plant)}
                                        disabled={addedToCart[plant.name]}
                                    >
                                        {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
