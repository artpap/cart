import {
  CLEAR_CART,
  REMOVE_ITEM,
  INCREASE_AMOUNT,
  DECREASE_AMOUNT,
  LOADING,
  DISPLAY_ITEMS,
} from './actions';

const reducer = (state, action) => {
  if (action.type === CLEAR_CART) {
    return { ...state, cart: new Map() };
  }

  if (action.type === REMOVE_ITEM) {
    const newCart = new Map(state.cart);
    newCart.delete(action.payload.id);

    return { ...state, cart: newCart };
  }

  if (action.type === INCREASE_AMOUNT) {
    const newCart = new Map(state.cart);
    const itemId = action.payload.id;
    const item = newCart.get(itemId);
    const newItem = { ...item, amount: item.amount + 1 };
    newCart.set(itemId, newItem);

    return { ...state, cart: newCart };
  }

  if (action.type === DECREASE_AMOUNT) {
    var newCart = new Map(state.cart);

    const itemId = action.payload.id;
    const item = newCart.get(itemId);

    if (item.amount - 1 === 0) {
      newCart.delete(itemId);
      return { ...state, cart: newCart };
    }

    const newItem = { ...item, amount: item.amount - 1 };
    newCart.set(itemId, newItem);

    return { ...state, cart: newCart };
  }

  if (action.type === DISPLAY_ITEMS) {
    const items = action.payload.cart.map((item) => [item.id, item]);
    const newCart = new Map(items);
    return { ...state, loading: false, cart: newCart };
  }

  if (action.type === LOADING) {
    return { ...state, loading: true };
  }

  // return state;
  throw new Error(`No matching "${action.type}" - action type`);
};

export default reducer;
