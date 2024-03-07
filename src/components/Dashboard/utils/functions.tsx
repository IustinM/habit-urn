import { DirectionsRun, LocalLibrary, Handshake, SelfImprovement, CreditCard, Assignment, QuestionMark, Favorite } from "@mui/icons-material"

export const returnBackground = (category:string) =>{
    switch(category){
        case "health":
            return '#ff99998c'
        case "sport":
            return '#00989b64'
        case 'productivity_and_personal_development':
            return '#f5619c67'
        case 'social_relationships':
            return  '#ffb89983'
        case 'mental_and_emotional_well-being':
            return '#99e7ff74'
        case 'financial':
            return '#99ffcc76'
        case 'daily_responsibilities':
            return '#e499ff76'
        default :
            return '#ffe7998f'
    }
}
export const returnColor = (category:string) =>{
    switch(category){
        case "health":
            return '#ea2b2b'
            case "sport":
            return '#00989b'
        case 'productivity_and_personal_development':
            return '#f50c69'
        case 'social_relationships':
            return  '#ff6727'
        case 'mental_and_emotional_well-being':
            return '#00baf2'
        case 'financial':
            return '#00de6f'
        case 'daily_responsibilities':
            return '#bb00ff'
        default :
            return '#edb808'
    }
}
export   const returnIcon = (category:string) =>{
    switch(category){
        case "health":
            return <Favorite/>
        case "sport":
            return <DirectionsRun/>
        case 'productivity_and_personal_development':
            return <LocalLibrary/>
        case 'social_relationships':
            return  <Handshake/>
        case 'mental_and_emotional_well-being':
            return <SelfImprovement/>
        case 'financial':
            return <CreditCard/>
        case 'daily_responsibilities':
            return <Assignment/>
        default :
            return <QuestionMark/>
    }
}
