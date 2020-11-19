// Infestation Objects Stored Here

export const allInfestations = [
    {
        id: 0,
        image: 'require("../images/beetle.png")',
        name: "Base Plan",
        description: "Base Plan description",
        products: [0, 1],
        upfrontPrice: 4.99,
        monthlyPrice: 12.99,
    },
    {
        id: 1,
        image: 'require("../images/cockroach.jpg")',
        name: "Cockroach",
        description: "Cockroach description",
        products: [2, 3, 4, 5],
        upfrontPrice: 5.99,
        monthlyPrice: 12.99,
    },
    {
        id: 2,
        image: 'require("../images/spider.jpg")',
        name: "Spiders",
        description: "Spiders description",
        products: [6],
        upfrontPrice: 6.99,
        monthlyPrice: 0,
    },
    {
        id: 3,
        image: 'require("../images/mosquito.jpg")',
        name: "Mosquitoes",
        description: "Mosquitoes description",
        products: [7, 9],
        upfrontPrice: 10.99,
        monthlyPrice: 4.99,
    }
];
