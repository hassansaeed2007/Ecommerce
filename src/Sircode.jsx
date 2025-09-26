import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./App.css"

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState("all")

  useEffect(()=>{
    const getAllProducts =  async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setFilteredProducts(response.data)
      } catch (error) {
        console.log(error);
      }
    }

    getAllProducts()
  },[])

  useEffect(()=>{
    let result = [...products];

    if(category !== "all"){
      result = result.filter(product => product.category === category)
    }

    if(search !== ""){
      result = result.filter(product => product.title.toLowerCase().includes(search))
    }

    if(price === "1-50"){
      result = result.filter(product => product.price >= 1 && product.price <= 50)
    } else if (price === "51-100"){
      result = result.filter(product => product.price >= 51 && product.price <= 100)
    } else if (price === "100+"){
      result = result.filter(product => product.price >= 101)
    }

    setFilteredProducts(result)
  },[category, search, price])
  return (
    <div>
      <div className="container">
        <h1 className="text-center mt-4 mb-4">Products</h1>
        <div className="filters d-flex justify-content-between">
        <div className="btn-container mb-5">
          <button className='btn btn-primary me-3' onClick={() => setCategory("all")}>All</button>
          <button className='btn btn-primary me-3' onClick={() => setCategory("men's clothing")}>Men's Clothing</button>
          <button className='btn btn-primary me-3' onClick={() => setCategory("women's clothing")}>Women's Clothing</button>
          <button className='btn btn-primary me-3' onClick={() => setCategory("electronics")}>Electronics</button>
          <button className='btn btn-primary me-3' onClick={() => setCategory("jewelery")}>Jewelery</button>
        </div>
        <div className="search-bar">
          <form action="">
            <input placeholder='Search here...' type="search" name="" id="" value = {search} onChange={(e) => setSearch(e.target.value)}/>
          </form>
        </div>
        </div>

        <div className="btn-container mb-5">
          <button className='btn btn-primary me-3' onClick={() => setPrice("all")}>All</button>
          <button className='btn btn-primary me-3' onClick={() => setPrice("1-50")}>$1 - $50</button>
          <button className='btn btn-primary me-3' onClick={() => setPrice("51-100")}>$51 - $100</button>
          <button className='btn btn-primary me-3' onClick={() => setPrice("100+")}>$100+</button>
          
        </div>
        <div className="row">
          {
            filteredProducts.map((product)=>(
              <div className="col-lg-3 col-sm-6 col-12 product">
                <img src={product.image} alt="" />
                <p>${product.price}</p>
                <h4>{product.title}</h4>
                <p>{product.category}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default App