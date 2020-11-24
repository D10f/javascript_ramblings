class ShoppingCart {
  constructor() {
    this.items = [];
  }

  getItems() {
    return this.items;
  }

  emptyCart() {
    this.items = [];
  }

  setCart(cart) {
    this.items = cart;
  }

  addItem(item) {
    const matchIdx = this.items.findIndex(cartItem => cartItem.id === item.id);
    if (matchIdx >= 0) {
      this.items[matchIdx].quantity++;
    } else {
      this.items.push({ ...item, quantity: 1 });
    }
  }

  removeItem(itemId) {
    const matchIdx = this.items.findIndex(cartItem => cartItem.id === itemId);
    if (matchIdx >= 0) {
      this.items.splice(matchIdx, 1);
    }
  }
}
