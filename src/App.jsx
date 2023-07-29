import './App.css'
import { getData } from './constants/db'
import Card from './components/card/card'
import Cart from './components/cart/cart'
import { useState } from 'react'

const courses = getData()

function App() {

  const telegram = window.Telegram.WebApp


  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    telegram.ready();
  })

  const onAddItem = item => {
    const existItem = cartItems.find(c => c.id == item.id);
    console.log('EXISTS_ITEM',existItem);

    if(existItem) {
      const newData = cartItems.map(c =>
        c.id == item.id
        ? {...existItem, quantity: existItem.quantity + 1}
        :c
        );
        console.log('ADD_QUANTITY_EXIST_ITEM', newData);
        setCartItems(newData)
    } else {
      const newData = [...cartItems, {...item, quantity: 1}];
      console.log('ADD_ITEM', newData);
      setCartItems(newData);
    }
  }

  const onRemoveItem = item  => {
    const existItem = cartItems.find(c => c.id == item.id);
    console.log('existItems', existItem);

    if(existItem.quantity === 1) {
      const newData = cartItems.filter(c => c.id !== existItem.id);
      console.log('DELETE_ITEM_QUANTITY_0', newData);
      setCartItems(newData)
    } else {
      const newData = cartItems.map(c => 
        c.id === existItem.id
        ? {...existItem, quantity: existItem.quantity - 1}
        : c
      );
      console.log('DELETE_1_ITEM_QUANTITY', newData);
      setCartItems(newData);
    }
  }

  const onCheckout = () => {
    telegram.MainButton.text = 'Sotib olish :)'
    telegram.MainButton.show()
  }

  return (
    <>
    <h1>Sammi Kurslari</h1>
    <Cart  cartItems = {cartItems} onCheckout={onCheckout}/>
    <div className='cards_container'>
      {courses.map(course => (
        <>
          <Card 
            key={course.id} 
            course={course}
             onAddItem = {onAddItem}
             onRemoveItem={onRemoveItem}
            />
        </>
      ))}
    </div>
    </>
  )
}

export default App
