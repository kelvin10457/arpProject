import { useEffect, useState } from 'react'
import Form from './components/form';
import ClasificationRecords from './components/clasificationRecords';

export default function Clasification() {
    const [clasifications, setClasifications] = useState([])

    async function fetchClasifications() {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/clasification`);
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