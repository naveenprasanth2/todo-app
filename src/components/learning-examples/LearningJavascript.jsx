const person ={
    name: 'naveen',
    address: {
        line1: 'baker street',
        line2: 'London',
        line3: 'UK'

    },
    profiles: ['twitter', 'linkedin', 'instagram'],
    printProfile: () =>{
        person.profiles.map(
            profile => console.log(profile)
            
        )
    
    }
    }

export default function LearningJavascript(){
    return(
        <>
            <div>{person.name}</div>
            <div>{person.address.line1}</div>
            <div>{person.address.line2}</div>
            <div>{person.address.line3}</div>
            <div>{person.profiles[0]}</div>
            <div>{person.printProfile()}</div>
        </>
    )
}