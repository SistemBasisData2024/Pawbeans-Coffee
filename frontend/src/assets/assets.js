import assets_affogato from './assets_affogato.png';
import assets_americano from './assets_americano.png';
import assets_cappuccino from './assets_cappuccino.png';
import assets_espresso from './assets_espresso.png';
import assets_frappuccino from './assets_frappuccino.png';
import assets_latte from './assets_latte.png';

import temporary_logo from './temporary_logo.png';
import temporary_logo_white from './temporary_logo_white.png';

export const assets = {
    temporary_logo,
    temporary_logo_white
}

export const coffee_list = [
    {
        _id: "1",
        name: "Affogato",
        image: assets_affogato,
        price: 15,
        description: "Affogato: A scoop of creamy vanilla gelato, drenched in a shot of hot, rich espresso.",
        category: "Affogato"
    },
    {
        _id: "2",
        name: "Americano",
        image: assets_americano,
        price: 15,
        description: "Americano: Smooth, bold espresso blended with hot water for a rich, robust coffee experience.",
        category: "Americano"
    },
    {
        _id: "3",
        name: "Cappuccino",
        image: assets_cappuccino,
        price: 15,
        description: "Cappuccino: A perfect balance of rich espresso, steamed milk, and velvety foam.",
        category: "Cappuccino"

    },
    {
        _id: "4",
        name: "Espresso",
        image: assets_espresso,
        price: 15,
        description: "Espresso: A small, strong shot of rich, full-bodied coffee.",
        category: "Espresso"
    },
    {
        _id: "5",
        name: "Frappuccino",
        image: assets_frappuccino,
        price: 15,
        description: "Frappuccino: A blended coffee drink with ice, milk, and flavored syrup, topped with whipped cream.",
        category: "Frappuccino"
    },
    {
        _id: "6",
        name: "Latte",
        image: assets_latte,
        price: 15,
        description: "Latte: Smooth espresso mixed with steamed milk and a touch of froth.",
        category: "Latte"
    }
]