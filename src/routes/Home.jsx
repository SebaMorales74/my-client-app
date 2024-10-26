import ClientList from '../components/ClientList';
export default function Home({ clients, handleDelete }) {
    return (
        <>
            <ClientList clients={clients} handleDelete={handleDelete} />
        </>
    )
}