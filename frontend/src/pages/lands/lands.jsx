import { useEffect, useState } from "react"
import Form from "./components/form"
import LandsRecords from "./components/landsRecords"


export default function Lands(){
    const [lands,setLands] = useState([]);

    async function fetchLands(){
        try {
            const response = await fetch("http://localhost:3000/api/lands");
            const data = await response.json();
            setLands(data)
        }
        catch(error){
            alert(`there was an error: ${error}`);
        }
    }
    
    useEffect(() => {
        fetchLands();
    },[]);

    return (
        <>
            <Form onRefresh={fetchLands} />
            <LandsRecords onRefresh={fetchLands} lands={lands}/>
        </>
    )
}