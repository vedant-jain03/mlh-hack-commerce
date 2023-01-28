import React, { useState } from 'react'
import axios from 'axios';
import { RxCross1 } from 'react-icons/rx'
import { AiOutlineArrowRight } from 'react-icons/ai'

const APP_ID = "f16f5438";
const APP_KEY = "d85bee42b820d43f82810b7812fe3d2d";

function CartContainer({ itemList }) {
  return (
    <div className="wrapper">
      <div className="itemLists">
        {
          itemList?.map((item) => (
            <div className="item">
              <span>{item.food}</span>
              <div className="right">
                <RxCross1 />
                <span style={{ marginLeft: '15px' }}>100 Rs.</span>
              </div>
            </div>
          ))
        }
        <div className='total'>
          <h3>Total</h3>
          <h1>1000 Rs.</h1>
        </div>
      </div>
      <button className='sec-btn' style={{marginTop: '10px', display: 'flex', alignItems:'center'}}>Checkout <AiOutlineArrowRight style={{marginLeft:'10px', fontSize:'16px'}} /></button>
    </div>
  )
}

function Dashboard() {
  const [itemList, setItemList] = useState([]);
  const [food, setFood] = useState("");
  const [loading, setLoading] = useState(false);
  const fetch = async (e) => {
    setLoading(true);
    e.preventDefault();
    const API = `https://api.edamam.com/api/recipes/v2?q=${food}&type=public&app_id=f16f5438&app_key=d85bee42b820d43f82810b7812fe3d2d`;
    let res = await axios.get(API);
    let ing = res.data;
    await setItemList(ing.hits[0].recipe.ingredients);
    setLoading(false);
  }
  return (
    <div>
      <div className="header">
        <h1 className='heading'>Kitchen Cart</h1>
        <h3 className='subheading'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h3>
      </div>
      <div className='input-wrapper'>
        <input type="text" value={food} onChange={(e) => setFood(e.target.value)} />
        <button className='sec-btn' onClick={(e) => fetch(e)}>Go</button>
      </div>
      <div className='cartContainer'>
        {
          loading ? <h3>Cooking . . .</h3> :
            (
              <div>
                <CartContainer itemList={itemList} />
              </div>
            )
        }
      </div>
    </div>
  )
}

export default Dashboard