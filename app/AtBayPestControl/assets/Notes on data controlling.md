Currently I am operating under the following design:

    1. Assets being pulled are being stored by type vs. by logic
       (i.e. product 7237 is pulled as a set of images, text, and
       additional information which is stored with information of a similar
       type .)
    2. Items are referenced dynamically through them having unique ids
        (i.e. a button pertaining to 7237 would simply pass its id to
        the corresponding function in the controller directory, which would return
        an object containing all necessary data.)

I am stating them just so we can keep consistent the controllers/data pulling once that starts up. Additionally, if you find a better schema or find an issue, just hmu.
-N
