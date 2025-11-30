export class CartService {
    constructor() {
        this.key = "cart";
    }

    getCart() {
        return JSON.parse(localStorage.getItem(this.key)) || [];
    }

    saveCart(cart) {
        localStorage.setItem(this.key, JSON.stringify(cart));
    }

    add(product) {
        const cart = this.getCart();
        const existing = cart.find((item) => Number(item.id) === Number(product.id));

        if(existing) {
            existing.quantity = (existing.quantity || 1) + 1;
        } else {
            cart.push({...product, quantity: 1});
        }

        this.saveCart(cart);
    }

    remove(id) {
        const cart = this.getCart();
        const updatedCart = cart.filter(item => Number(item.id) !== Number(id));
        this.saveCart(updatedCart);
    }

    changeQuantity(id, delta) {
        const cart = this.getCart();
        const item = cart.find(p => Number(p.id) === Number(id));

        if (item) {
            item.quantity = (item.quantity || 1) + delta;
            if (item.quantity < 1) item.quantity = 1; 
        }

        this.saveCart(cart);
    }

    clear() {
        localStorage.removeItem(this.key);
    }

    getTotal() {
        const cart = this.getCart();
        return cart.reduce((acc, item) => acc + (Number(item.price) * (item.quantity || 1)), 0);
    }
}