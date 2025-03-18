interface ItemWithPriceAndQuantity {
    price: number;
    quantity: number;
}

export const countTotalPrice = <T extends ItemWithPriceAndQuantity>(items: T[]) => {
    return items.reduce((total: number, item: T) => {
        return total + item.price * item.quantity;
    }, 0).toFixed(2);
}