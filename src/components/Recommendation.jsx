import React from 'react'

function Recommendation({ setFood, fetch }) {
  return (
    <div className='r-container'>
      <h2 style={{marginBottom: '20px'}}>Recommendations</h2>
      <div className="r-wrapper">
        <div className="recom">
          <span>Dosa</span>
          <button onClick={(e) => {
            setFood("dosa");
            fetch(e);
          }} >Cook it</button>
        </div>
        <div className="recom">
          <span>Dosa</span>
          <button>Cook it</button>
        </div>
        <div className="recom">
          <span>Dosa</span>
          <button>Cook it</button>
        </div>
        <div className="recom">
          <span>Dosa</span>
          <button>Cook it</button>
        </div>
      </div>
    </div>
  )
}

export default Recommendation