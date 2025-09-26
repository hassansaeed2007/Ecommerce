import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios"
import "./details.css"

const Detail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const getProductDetail = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`)
        setProduct(response.data)
      } catch (error) {
        console.log(error);
      }
    }
    getProductDetail();
  }, [id])

  if (!product) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="detail-page">
      <div className="detail-container">
        <img src={product.image} alt={product.title} className="detail-image" />

        <div className="detail-info">
          <h4 className="detail-title">{product.title}</h4>
          <p className="detail-price">${product.price}</p>
          <p className="detail-category">{product.category}</p>
          <p className="detail-description">{product.description}</p>

          <button onClick={() => navigate(-1)} className="back-button">
            ← Back to Products
          </button>
        </div>
      </div>
    </div>
  )
}

export default Detail
