import { iProduct } from '../models/product.interface';

const handleAddToCart = (p: iProduct, quantity: number = 1) => {
    console.log('handleAddToCart', quantity);
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

    let newItems = [...cartItems];

    const findItem = cartItems.find((item: iProduct) => item._id === p._id);

    if (findItem) {
        const updatedItems = newItems.map((item) => {
            if (item._id === p._id) {
                item.quantity = quantity;
                item.total = quantity * item.offerPrice;
            }
            return item;
        });
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    } else {
        newItems = [...newItems, { ...p, quantity, total: p.offerPrice }];
        localStorage.setItem('cartItems', JSON.stringify(newItems));
    }
};

export default handleAddToCart;
