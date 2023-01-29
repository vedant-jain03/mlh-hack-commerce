import React from 'react'

function Recommendation({ setRecommendation }) {
  return (
    <div className='r-container'>
      <h2 style={{marginBottom: '20px'}}>Recommendations</h2>
      <div className="r-wrapper">
        <div className="recom">
          <span>Dosa</span>
          <button onClick={(e) => setRecommendation("dosa", e)} >Cook it</button>
        </div>
        <div className="recom">
          <span>Pizza</span>
          <button onClick={(e) => setRecommendation("pizza", e)} >Cook it</button>
        </div>
        <div className="recom">
          <span>Sandwitch</span>
          <button onClick={(e) => setRecommendation("sandwitch", e)} >Cook it</button>
        </div>
        <div className="recom">
          <span>Burger</span>
          <button onClick={(e) => setRecommendation("burger", e)} >Cook it</button>
        </div>
        <div className="recom">
          <span>Pav Bhaji</span>
          <button onClick={(e) => setRecommendation("pav bhaji", e)} >Cook it</button>
        </div>
        <div className="recom">
          <span>French Fries</span>
          <button onClick={(e) => setRecommendation("French Fries", e)} >Cook it</button>
        </div>
      </div>
    </div>
  )
}

export default Recommendation