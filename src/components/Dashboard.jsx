import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { RxCross1 } from 'react-icons/rx'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './Login';
import Recommendation from './Recommendation';

const APP_ID = "f16f5438";
const APP_KEY = "d85bee42b820d43f82810b7812fe3d2d";

function Confimation({ setSuccessPopup }) {
  return (
    <div className="popup-container">
      <div className="popup-wrapper" style={{ marginTop: '0', position: 'relative' }}>
        <svg id="successAnimation" class="animated" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 70 70">
          <path id="successAnimationResult" fill="#D8D8D8" d="M35,60 C21.1928813,60 10,48.8071187 10,35 C10,21.1928813 21.1928813,10 35,10 C48.8071187,10 60,21.1928813 60,35 C60,48.8071187 48.8071187,60 35,60 Z M23.6332378,33.2260427 L22.3667622,34.7739573 L34.1433655,44.40936 L47.776114,27.6305926 L46.223886,26.3694074 L33.8566345,41.59064 L23.6332378,33.2260427 Z" />
          <circle id="successAnimationCircle" cx="35" cy="35" r="24" stroke="#979797" stroke-width="2" stroke-linecap="round" fill="transparent" />
          <polyline id="successAnimationCheck" stroke="#979797" stroke-width="2" points="23 34 34 43 47 27" fill="transparent" />
        </svg>
        <h2>Order Placed!</h2>
        <button className='cross' onClick={() => setSuccessPopup(false)}><RxCross1 /></button>
      </div>
    </div>
  )
}

function DiscountPopup({ setDiscPopup, setDiscount }) {
  return (
    <div className="popup-container">
      <div className="popup-wrapper" style={{ marginTop: '0', position: 'relative' }}>
        <h2 style={{ marginBottom: '10px' }}>Coupons Available</h2>
        <div className="pw-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0' }}>
          <span>MLHHACK</span>
          <button onClick={() => {
            setDiscount(120);
            setDiscPopup(false)
          }}>Apply</button>
        </div>
        <div className="pw-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0' }}>
          <span>COMMERCEHACK</span>
          <button onClick={() => {
            setDiscount(100);
            setDiscPopup(false)
          }}>Apply</button>
        </div>
        <button className='cross' onClick={() => setDiscPopup(false)}><RxCross1 /></button>
      </div>
    </div>
  )
}

function CheckoutPopup({ setCheckoutPopup, total, discount, setSuccessPopup, setItemList }) {
  return (
    <div className="popup-container">
      <div className="popup-wrapper" style={{ marginTop: '0', position: 'relative' }}>
        <h2 style={{ marginBottom: '10px' }}>Checkout Successful</h2>
        <div className="pw-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0' }}>
          <span>Total</span>
          <span>Rs. {total}</span>
        </div>
        <div className="pw-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0' }}>
          <span>Discount</span>
          <span>- {discount}</span>
        </div>
        <div className='total'>
          <h3>Grand Total</h3>
          <h1>Rs. {eval(total - discount)}</h1>
        </div>
        <div className="pw-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 111px' }}>
          <button className='sec-btn' style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }} onClick={() => {
            setCheckoutPopup(false);
            setSuccessPopup(true);
            setItemList([]);
          }}> Pay <AiOutlineArrowRight style={{ marginLeft: '10px' }} /></button>
        </div>
        <button className='cross' onClick={() => setCheckoutPopup(false)}><RxCross1 /></button>
      </div>
    </div>
  )
}

function CartContainer({ itemList, total, deleteItem, setDiscPopup, setCheckoutPopup, discount }) {
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
        {
          discount === 0 ?
            <div className='total'>
              <h3>Total</h3>
              <h1>Rs. {total}</h1>
            </div>
            :
            <div style={{ borderTop: '1px solid' }} className='total-discount'>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
                <h3>Total</h3>
                <h2>Rs. {total}</h2>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3>Discount</h3>
                <h2>- {discount}</h2>
              </div>
              <div className='total'>
                <h3>Grand Total</h3>
                <h1>Rs. {eval(total - discount)}</h1>
              </div>
            </div>
        }
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className='sec-btn' style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }} onClick={() => {
          setDiscPopup(true)
        }} >Add coupon<AiOutlineArrowRight style={{ marginLeft: '10px', fontSize: '16px', cursor: 'pointer' }} /></button>
        <button className='sec-btn' style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}
          onClick={() => {
            setCheckoutPopup(true)
          }}
        >
          Checkout <AiOutlineArrowRight style={{ marginLeft: '10px', fontSize: '16px', cursor: 'pointer' }} /></button>
      </div>
    </div>
  )
}

function Dashboard() {
  const { isAuthenticated } = useAuth0();
  const [itemList, setItemList] = useState([]);
  const [resultFood, setResultFood] = useState("");
  const [food, setFood] = useState("");
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [discountPopup, setDiscPopup] = useState(false);
  const [checkoutPopup, setCheckoutPopup] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [successPopup, setSuccessPopup] = useState(false);
  const fetch = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(food);
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
  }
  const setRecommendation = async (name, e) => {
    console.log(name);
    await setFood(name);
    e.preventDefault();
    setLoading(true);
    console.log(name);
    const API = `https://api.edamam.com/api/recipes/v2?q=${name}&type=public&app_id=f16f5438&app_key=d85bee42b820d43f82810b7812fe3d2d`;
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
    setResultFood(name);
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
    <div style={!isAuthenticated ? { display: 'flex', alignItems: 'center', flexDirection: 'column' } : {}}>
      {successPopup ? <Confimation setSuccessPopup={setSuccessPopup} /> : null}
      {discountPopup ? <DiscountPopup setDiscPopup={setDiscPopup} setDiscount={setDiscount} /> : null}
      {checkoutPopup ? <CheckoutPopup setCheckoutPopup={setCheckoutPopup} total={total} discount={discount}
      setSuccessPopup={setSuccessPopup} setItemList={setItemList} /> : null}
      <div className="header">
        <h1 className='heading'>KitchenCart</h1>
        <h3 className='subheading'>"From recipe to cart, in just a few clicks"</h3>
      </div>
      {
        !isAuthenticated ? <LoginButton />
          :
          <div>
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
                            <CartContainer itemList={itemList} total={total} deleteItem={deleteItem} setDiscPopup={setDiscPopup}
                              setCheckoutPopup={setCheckoutPopup}
                              discount={discount} />
                          </div>
                        )
                    )
                )
              }
            </div>
            <Recommendation setRecommendation={setRecommendation} />
          </div>
      }
    </div>
  )
}

export default Dashboard