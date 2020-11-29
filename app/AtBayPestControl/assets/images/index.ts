
 const images = {
    //Bugs are organized by image name
    bugs: {
        ant1: require('./ant.png'),
        ant2: require('./ant2.jpg'),
        ant3: require('./ant3.jpg'),
        beetle: require('./beetle.png'),
        blue_beetle: require('./blue_beetle.png'),
        honey_bee: require('./honey_bee.png'),
        honey_bee2: require('./honey_bee2.jpg'),
        honey_bee3: require('./honey_bee3.jpg'),
        cockroach: require('./cockroach.jpg'),
        mosquito: require('./mosquito.jpg'),
        spider: require('./spider.jpg'),
        error: require('./error.jpg'),
        raid: require('./1831477.webp'),


    },
     error: require('./error.jpg'),

     //The following are implicitly indexed by ID
    infestations: [
        require('./beetle.png'),
        require('./cockroach.jpg'),
        require('./spider.jpg'),
        require('./mosquito.jpg'),
    ],
    equipment: [
        require('./spreader.jpg'),
        require('./sprayer2.jpg'),
        require('./cobwebDuster.jpg'),
    ],
    product: [
        require('./product1.png'),
        require('./product2.jpg'),
        require('./product3.jpg'),
        require('./product4.jpg'),
        require('./product5.png'),
        require('./product6.jpg'),
        require('./product7.jpg'),
        require('./product8.jpg'),
        require('./product9.png'),
    ],
     user: {
         profile_picture: require('./profile_picture.jpg'),
         background: require('./splash.png')

     },
     splash: {
        splash1: require('./splash.png'),
         splash2: require('./splash1 (2).png'),

     },

}

export default images;
