const add = (cart, req) => {
    console.dir(cart);
    cart.products.push(req.body);
    console.log(cart.countGoods);
    cart.countGoods = cart.products.length;
    console.log(cart.countGoods);
    console.log(cart.amount);
    let amount = 0;
    cart.products.forEach(el => amount += el.quantity * el.price);
    cart.amount = amount;
    console.log(cart.amount);

    return { name: req.body.name, newCart: JSON.stringify(cart, null, 4) };
};

const change = (cart, req) => {
    console.dir(cart);
    const find = cart.products.find(el => el.id === +req.params.id);
    find.quantity += req.body.quantity;
    return { name: find.name, newCart: JSON.stringify(cart, null, 4) };
};

/**
 * Добавили новый метод удаления
 * @param cart
 * @param req
 * @returns {{newCart: *, name: *}}
 */
const remove = (cart, req) => {
    console.log(req.params.id);
    const find = cart.products.find(el => el.id === +req.params.id);
    cart.products.splice(cart.products.indexOf(find), 1);
    return { name: find.name, newCart: JSON.stringify(cart, null, 4) };
};

module.exports = {
    add,
    change,
    remove,
};