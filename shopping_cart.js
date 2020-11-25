class ShoppingCart {
  constructor() {
    this.items = [];
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

  getItems() {
    return this.items;
  }

  getTotalPrice() {
    return this.items.reduce((acc, val) => acc + val);
  }

  emptyCart() {
    this.items = [];
  }

  setCart(cart) {
    this.items = cart;
  }
}
