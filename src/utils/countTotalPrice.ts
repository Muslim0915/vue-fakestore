interface ItemWithPriceAndQuantity {
    price: number;
    quantity: number;
}

export const countTotalPrice = <T extends ItemWithPriceAndQuantity>(items: T[]) => {
    if (items.length === 0) {
        return 0;
    }

    const totalCount = items.reduce((total: number, item: T) => {
        const priceByQuantity = item.price * item.quantity;

        return total + priceByQuantity;
    }, 0);

    return totalCount.toFixed(2);
}
