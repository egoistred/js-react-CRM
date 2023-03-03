import { CRMHeading } from "./CRMHeading";
import { CRMElement } from "./CRMElement";

export interface Client {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  surname: string;
  lastName: string;
  contacts?: {
     type: string,
     value: string 
}[];
}

export function CRMTable({
  clients,
  setDeleteModal,
  setChangeModal,
  getId,
}: {
  clients: Client[];
  setDeleteModal: Function;
  setChangeModal: Function;
  getId: Function;
}) {
  return (
    <table className="CRMTable">
      <CRMHeading />
      <tbody>
        {clients.length > 0 &&
          clients.map((client: Client) => (
            <CRMElement
              client={client}
              setDeleteModal={() => setDeleteModal()}
              setChangeModal={() => setChangeModal()}
              getId={getId}
              {...client}
              key={client.id}
            />
          ))}
      </tbody>
    </table>
  );
}
