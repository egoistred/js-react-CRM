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
  const [searchResults, setSearchResults] = useState([]);
  const [id, setId] = useState("");
  const [client, setClient] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true)
    const clients: [] = await ky("http://localhost:3000/api/clients").json();
    setClients(clients);
    setSearchResults(clients);
    setIsLoading(false);
  }

  return (
    <>
      <Header clients={clients} setSearchResults={setSearchResults} />
      <main>
        <section className="crm">
          <div className="container">
            <h1 className="heading">Клиенты</h1>
            <CRMTable
              searchResults={searchResults}
              setSearchResults={setSearchResults}
              setDeleteModal={() => setDeleteModal(true)}
              setChangeModal={() => setChangeModal(true)}
              getId={getId}
              getClient={getClient}
            />
            <AddButton onClick={() => setAddModal(true)} />
            <Modal open={addModal} onClose={() => setAddModal(false)}>
              <AddForm
                clients={clients}
                setSearchResults={setSearchResults}
                onClose={() => setAddModal(false)}
              />
            </Modal>
            <Modal open={deleteModal} onClose={() => setDeleteModal(false)}>
              <DeleteForm
                id={id}
                setSearchResults={setSearchResults}
                clients={clients}
                onClose={() => setDeleteModal(false)}
              />
            </Modal>
            <Modal open={changeModal} onClose={() => setChangeModal(false)}>
              <ChangeForm
                client={client}
                getClients={getClients}
                setSearchResults={setSearchResults}
                clients={clients}
                onClose={() => setChangeModal(false)}
              />
            </Modal>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
