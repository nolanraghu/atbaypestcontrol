// Infestation Objects Stored Here

export const allInfestations = [
    {
        id: 0,
        image: require("../images/beetle.png"), //TODO: Add better image
        name: "Base Plan",
        description: "Base Plan description",
        products: [0, 1],
        price: 4.99
    },
    {
        id: 1,
        image: require("../images/honey_bee.png"), //TODO: Add the cockroach
        name: "Cockroach",
        description: "Cockroach description",
        products: [2, 3, 4, 5],
        price: 5.99
    },
    {
        id: 2,
        image: require("../images/beetle.png"), //TODO: Add the spider
        name: "Spider",
        description: "Spiders description",
        products: [6],
        price: 6.99
    },
    {
        id: 3,
        image: require("../images/beetle.png"), //TODO: Add the mosquito
        name: "Mosquito",
        description: "Mosquitoes description",
        products: [7, 9],
        price: 5.99
    }
];
