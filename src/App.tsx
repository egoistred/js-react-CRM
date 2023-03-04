import { useState, useEffect } from "react";
import { AddButton } from "./components/AddButton";
import { AddForm } from "./components/AddForm";
import { CRMTable } from "./components/CRMTable";
import { Header } from "./components/Header";
import { Modal } from "./components/Modal";
import ky from "ky";

import DeleteForm from "./components/DeleteForm";
import ChangeForm from "./components/ChangeForm";

function App() {
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [changeModal, setChangeModal] = useState(false);
  const [clients, setClients] = useState([]);
  const [id, setId] = useState("");
  const [client, setClient] = useState({});
  
  const getId = (newId: string) => {
    setId(newId);
  };

  const getClient = (client: string) => {
    setClient(client);
  };


  useEffect(() => {
    getClients();
  }, []);

  async function getClients() {
    const clients: [] = await ky("http://localhost:3000/api/clients").json();
    setClients(clients);
  }

  return (
    <>
      <Header />
      <main>
        <section className="crm">
          <div className="container">
            <h1 className="heading">Клиенты</h1>
            <CRMTable
              clients={clients}
              setDeleteModal={() => setDeleteModal(true)}
              setChangeModal={() => setChangeModal(true)}
              getId={getId}
              getClient={getClient}
            />
            <AddButton onClick={() => setAddModal(true)} />
            <Modal open={addModal} onClose={() => setAddModal(false)}>
              <AddForm clients={clients} setClients={setClients} />
            </Modal>
            <Modal open={deleteModal} onClose={() => setDeleteModal(false)}>
              <DeleteForm id={id} getClients={getClients} clients={clients} />
            </Modal>
            <Modal open={changeModal} onClose={() => setChangeModal(false)}>
              <ChangeForm client={client} getClients={getClients} clients={clients} />
            </Modal>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
