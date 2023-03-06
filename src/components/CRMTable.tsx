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
    type: string;
    value: string;
  }[];
}

export function CRMTable({
  searchResults,
  setSearchResults,
  setDeleteModal,
  setChangeModal,
  getId,
  getClient,
}: {
  searchResults: Client[];
  setDeleteModal: Function;
  setChangeModal: Function;
  setSearchResults: Function;
  getId: Function;
  getClient: Function;
}) {
  return (
    <table className="table">
      <CRMHeading
        searchResults={searchResults}
        setSearchResults={setSearchResults}
      />
      <tbody className="tbody">
        {searchResults.length > 0 &&
          searchResults.map((client: Client) => (
            <CRMElement
              client={client}
              setDeleteModal={() => setDeleteModal()}
              setChangeModal={() => setChangeModal()}
              getId={getId}
              getClient={getClient}
              {...client}
              key={client.id}
            />
          ))}
      </tbody>
    </table>
  );
}
