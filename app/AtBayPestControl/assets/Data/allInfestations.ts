// Infestation Objects Stored Here

const PDATA: allInfestations[] = [
    {
        id: "b1",
        image: require("../assets/images/beetle.png"), //TODO: Add better image
        name: "Base Plan",
        description: "Base Plan description",
        // products:
        price: 4.99
    },
    {
        id: "b2",
        image: require("../assets/images/honey_bee.png"), //TODO: Add the cockroach
        name: "Cockroach",
        description: "Cockroach description",
        // products:
        price: 5.99
    },
    {
        id: "b3",
        image: require("../assets/images/beetle.png"), //TODO: Add the spider
        name: "Spiders",
        description: "Spiders description",
        // products:
        price: 6.99
    },
    {
        id: "b4",
        image: require("../assets/images/beetle.png"), //TODO: Add the mosquito
        name: "Mosquitoes",
        description: "Mosquitos description",
        // products:
        price: 5.99
    }
];

interface allInfestations{
    id: String,
    image: NodeRequire,
    name: String,
    description: String,
    // products: String[],
    price: number

}