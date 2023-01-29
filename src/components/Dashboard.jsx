import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { RxCross1 } from 'react-icons/rx'
import { AiOutlineArrowRight } from 'react-icons/ai'

const APP_ID = "f16f5438";
const APP_KEY = "d85bee42b820d43f82810b7812fe3d2d";

function DiscountPopup({ setDiscPopup }) {
  return (
    <div className="popup-container">
      <div className="popup-wrapper" style={{ marginTop: '0', position: 'relative' }}>
        <h2 style={{ marginBottom: '10px' }}>Coupons Available</h2>
        <div className="pw-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0' }}>
          <span>MLHHACK</span>
          <button>Apply</button>
        </div>
        <div className="pw-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0' }}>
          <span>MLH_HACKS</span>
          <button>Apply</button>
        </div>
        <button className='cross' onClick={() => setDiscPopup(false)}><RxCross1 /></button>
      </div>
    </div>
  )
}

function CartContainer({ itemList, total, deleteItem, setDiscPopup }) {
  return (
    <div className="wrapper">
      <div className="itemLists">
        {
          itemList?.map((item, index) => (
            <div className="item">
              <span>{item.food}</span>
              <div className="right">
                <span style={{ marginRight: '15px' }}>{item.cost} Rs.</span>
                <RxCross1 style={{ cursor: 'pointer' }} onClick={() => deleteItem(index)} />
              </div>
            </div>
          ))
        }
        <div className='total'>
          <h3>Total</h3>
          <h1>Rs. {total}</h1>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className='sec-btn' style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }} onClick={() => {
          setDiscPopup(true)
        }} >Add coupon<AiOutlineArrowRight style={{ marginLeft: '10px', fontSize: '16px', cursor: 'pointer' }} /></button>
        <button className='sec-btn' style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>Checkout <AiOutlineArrowRight style={{ marginLeft: '10px', fontSize: '16px', cursor: 'pointer' }} /></button>
      </div>
    </div>
  )
}

function Dashboard() {
  const [itemList, setItemList] = useState([]);
  const [resultFood, setResultFood] = useState("");
  const [food, setFood] = useState("");
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [discountPopup, setDiscPopup] = useState(false);
  const fetch = async (e) => {
    setLoading(true);
    e.preventDefault();
    const API = `https://api.edamam.com/api/recipes/v2?q=${food}&type=public&app_id=f16f5438&app_key=d85bee42b820d43f82810b7812fe3d2d`;
    let res = await axios.get(API);
    let ing = res.data;
    const temp = ing.hits[0].recipe.ingredients;
    let subtotal = 0;
    temp.forEach((element) => {
      element.cost = Math.floor(100 + Math.random() * 900);
      subtotal += element.cost;
    })
    console.log(temp);
    setTotal(subtotal);
    await setItemList(ing.hits[0].recipe.ingredients);
    setLoading(false);
    setResultFood(food);
    setFood("");
  }
  const deleteItem = async (id) => {
    console.log(id);
    const newItemList = itemList.filter((item, index) => {
      return (index !== id)
    })
    let subtotal = 0;
    newItemList.forEach((element) => {
      subtotal += element.cost;
    })
    setTotal(subtotal);
    setItemList(newItemList);
  }
  return (
    <div>
      {discountPopup ? <DiscountPopup setDiscPopup={setDiscPopup} /> : null}
      <div className="header">
        <h1 className='heading'>KitchenCart</h1>
        <h3 className='subheading'>"From recipe to cart, in just a few clicks"</h3>
      </div>
      <div className='input-wrapper'>
        <input type="text" value={food} onChange={(e) => setFood(e.target.value)} />
        <button className='sec-btn' onClick={(e) => fetch(e)}>Go</button>
      </div>
      <div className='cartContainer'>
        {
          (
            loading ? <h3>Cooking . . .</h3> :
              (
                itemList.length === 0 ? null :
                  (
                    <div>
                      <h3 style={{ marginBottom: '10px' }} >Here is your cart for "{resultFood}"</h3>
                      <CartContainer itemList={itemList} total={total} deleteItem={deleteItem} setDiscPopup={setDiscPopup} />
                    </div>
                  )
              )
          )
        }
      </div>
    </div>
  )
}

export default Dashboard