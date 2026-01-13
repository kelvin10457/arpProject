import { useEffect, useState } from 'react'
import Form from './components/form'
import HarvestRecords from './components/harvestRecords';

export default function Harvest(){

    
    const [harvests,setHarvests] = useState([]);
    
    async function fetchHarvests(){
        console.log(harvests);
        try {
            const response = await fetch("http://localhost:3000/api/harvest");
            const data = await response.json();
            setHarvests(data)
        }
        catch(error){
            alert(`hubo un error ${error}`);
        }
    }

    useEffect(()=> {
        fetchHarvests();
    },[]);

    return (
        <>
        <Form onRefresh={fetchHarvests}/>
        <HarvestRecords harvests={harvests} onRefresh={fetchHarvests} />
        </>
    )
}