import { useEffect, useState } from 'react'
import axios from "axios"
import "./ecommerce.css"
import React from 'react'
import { Link } from 'react-router-dom'

const Ecommerce = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [category, setCategory] = useState("all")
  const [search, setSearch] = useState("")
  const [price, setPrice] = useState("all")

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products")
        setProducts(response.data)
        setFilteredProducts(response.data)
      } catch (error) {
        console.log(error);
      }
    }
    getAllProducts()
  }, [])

  useEffect(() => {
    let result = [...products]
    if (category !== "all") {
      result = result.filter(product => product.category === category)
    }
    if (search !== "") {
      result = result.filter(product => product.title.toLowerCase().includes(search.toLowerCase()))

    }
    if (price === "1-50") {
      result = result.filter(product => product.price >= 1 && product.price <= 50)
    } else if (price === "51-100") {
      result = result.filter(product => product.price >= 51 && product.price <= 100)
    } else if (price === "100+") {
      result = result.filter(product => product.price >= 101)
    }
    setFilteredProducts(result)
  }, [category, search, price, products])

  return (
    <div className="ecommerce-page">
      <div className="ecommerce">
        <h1 className="ecommerce-heading">Products</h1>

        {/* Category Filter */}
        <div className="filter-buttons">
          <button className='filter-btn' onClick={() => setCategory("all")}>All</button>
          <button className='filter-btn' onClick={() => setCategory("men's clothing")}>Men's Clothing</button>
          <button className='filter-btn' onClick={() => setCategory("women's clothing")}>Women's Clothing</button>
          <button className='filter-btn' onClick={() => setCategory("electronics")}>Electronics</button>
          <button className='filter-btn' onClick={() => setCategory("jewelery")}>Jewelery</button>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            placeholder='Search here...'
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Price Filter */}
        <div className="filter-buttons price-filter">
          <button className='filter-btn' onClick={() => setPrice("all")}>All</button>
          <button className='filter-btn' onClick={() => setPrice("1-50")}>$1 - $50</button>
          <button className='filter-btn' onClick={() => setPrice("51-100")}>$51 - $100</button>
          <button className='filter-btn' onClick={() => setPrice("100+")}>$100+</button>
        </div>

        {/* Products Grid */}
        <div className="products-grid"> 
          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <Link to={`/${product.id}`} className="product-link">
                <img className="product-img" src={product.image} alt={product.title} />
                <p className="product-price">${product.price}</p>
                <h4 className="product-title">{product.title}</h4>
                <p className="product-category">{product.category}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Ecommerce
