import {Team} from "expo-cli/build/appleApi";

const TEAM: Array<TeamProps>  = [
    {
        name: "Nolan Raghu",
        gitHub: 'nolanraghu',
        email: 'nolan.raghu@vanderbilt.edu',
    },
    {
        name: "Anuja Mehta",
         gitHub: 'anujamehta',
         email: 'anuja.mehta@vanderbilt.edu',
     },
    {
        name: "Kobin Kempe",
         gitHub: "kobinkempe",
         email: 'kobin.g.kempe@vanderbilt.edu',
     },
    {
        name:"Kahero Harriott",
         gitHub: "KaheroH",
         email: "kahero.t.harriott@vanderbilt.edu",
     },
    {
        name: "Brandon Kimball",
         gitHub: "",
         email: "brandon.kimball.thereal@gmail.com",
     },
];

interface TeamProps {
    name: string,
    gitHub: string,
    email:string,

 }
export default TEAM
