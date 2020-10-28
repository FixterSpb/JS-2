const calc = (cart) => {
    cart.countGoods = cart.products.length;
    cart.amount = 0;
    cart.products.forEach((item) => cart.amount += item.price * item.quantity);
    return cart;
}
const add = (cart, req) => {
    cart.products.push(req.body);
    return { name: req.body.name, newCart: JSON.stringify(calc(cart), null, 4) };
};

const change = (cart, req) => {
    const find = cart.products.find(el => el.id === +req.params.id);
    find.quantity += req.body.quantity;
    return { name: find.name, newCart: JSON.stringify(calc(cart), null, 4) };
};

const remove = (cart, req) => {
    const find = cart.products.find(el => el.id === +req.params.id);
    cart.products.splice(cart.products.indexOf(find), 1);
    return { name: find.name, newCart: JSON.stringify(calc(cart), null, 4) };
};

module.exports = {
    add,
    change,
    remove,
};