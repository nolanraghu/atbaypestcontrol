// I thought the name Infestation was more accurate than Bug
// This class contains all the information I learned about classes.
// TODO: Decide how we want things to display when we aren't connected to the database. Should they still be able
//  to access all the information as it was when they last connected, then if they try to make a change receive
//  an error? That's what I think it should be? Which brings up my question about the database. Is the database at
//  a url? Or is it stored in the www folder and then updates itself?

class Infestation {
    // I don't think we want to directly get any of this because we want it to be accessed from the database.
    // There will probably not be many of these
    private name: string
    //? = optional
    private image?: object
    private productList?: Product[]
    constructor(name: string, productList?: Product[]){
        this.name = name
        this.image = require('../images/ant.png')
    }

    // There's a reason I did it this way; Otherwise, if you call getProductList within an object,
    // 'this' will refer to that object. Stupid javascript. You don't have to do this if you aren't using 'this'
    getProductList = () => {
        return this.productList
    }

    // See I don't use this in this one
    getImage(){
        return require('../images/ant.png')
    }
}