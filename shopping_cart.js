class ShoppingCart {
  constructor(key) {
    this.key = key;
    this.totalPrice = 0;
    this.items = localStorage.getItem(key)
    ? new Map(JSON.parse(localStorage.getItem(key)))
    : new Map();
  }

  /**
  * Adds a new item to this shopping cart
  * @param  {object} newItem  The new item to be added.
  * @param  {number} quantity How many items to add during this function call
  * @return {map}             The shopping cart map with the updated items
  */
  addItem(newItem, quantity = 1) {
    const itemInCart = this.items.get(newItem.id);
    if (itemInCart) {
      itemInCart.quantity += quantity;
    } else {
      this.items.set(newItem.id, { ...newItem, quantity });
    }

    this.totalPrice += newItem.price * quantity;
    this.persistStorage();
    return this.items;
  }


  /**
  * Decreases the quantity of an item, or removes it entirely from the cart
  * @param  {number} itemId   The id of the item to be removed.
  * @param  {number} quantity Decrease quantity by this much, or all items
  * @return {map}             The shopping cart map with the updated items
  */
  removeItem(itemId, quantity = undefined) {

    const item = this.items.get(itemId);
    if (!item) return false;

    if (!quantity) {
      this.items.delete(itemId);
    } else {
      item.quantity -= quantity;
    }

    this.totalPrice = this.getTotalPrice();
    this.persistStorage();
    return this.items;
  }


  /**
  * Saves the current state of the shopping cart to browser's local storage
  * @return {boolean}      Returns true if cart is saved successfully
  */
  persistStorage() {
    localStorage.setItem(this.key, [...this.getItems()]);
    return true
  }

  /**
  * Calculates the total price of all items currently in the shopping cart
  * @return {number}      The sum of all items' price in the cart
  */
  getTotalPrice() {
    let sum = 0;
    for (const item in this.items) {
      sum += item.price * item.quantity;
    }
    return sum;
  }

  /**
  * Calculates the most common item in the cart
  * @return {object}      The cart item with the highest quantity count
  */
  getMostCommonItem() {
    const frequency = 0;
    const itemId = ''; // assuming string using uuidv4 or uuidv5

    for (const {id, quantity} of this.items) {
      if (quantity > frequency) {
        frequency = quantity;
        itemId = id;
      }
    }

    return this.items.get(itemId);
  }

  /**
  * Returns all items in the shopping cart
  * @return {map}      A JS Map representing this shopping cart
  */
  getItems() {
    return this.items;
  }

  /**
  * Resets the shopping cart to an empty state
  * @return {boolean}      Returns true if action was successful
  */
  clearItems() {
    this.items.clear();
    this.persistStorage();
    return true;
  }
}
