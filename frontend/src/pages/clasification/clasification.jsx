import { useEffect, useState } from 'react'
import Form from './components/form';
import ClasificationRecords from './components/clasificationRecords';

export default function Clasification() {
    const [clasifications, setClasifications] = useState([])

    async function fetchClasifications() {
        try {
            const response = await fetch("http://localhost:3000/api/clasification");
            const data = await response.json();
            console.log('clasification data', data);
            setClasifications(data);
        } catch (error) {
            alert(`hubo un error ${error}`);
        }
    }

    useEffect(() => {
        fetchClasifications();
    }, []);

    return (
        <>
            <Form onRefresh={fetchClasifications} />
            <ClasificationRecords clasifications={clasifications} onRefresh={fetchClasifications} />
        </>
    )
}