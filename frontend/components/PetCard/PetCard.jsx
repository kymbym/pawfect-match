import { Link } from "react-router-dom";

export default function PetCard({ pet, view }) {
  const petLink =
    view === "partner" ? `/partner/pets/${pet._id}` : `/pets/${pet._id}`;

  return (
    <>
      <figure className="image is-256x256" style={{ width: "24em", padding:"15px" }}>
        <Link to={petLink}>
          <img
            className="is-rounded"
            src={pet.profilePhoto}
            alt={`photo of ${pet.name}`}
          />
          <h1 className="titan-one-regular" style={{padding:"8px"}}>{pet.name}</h1>
        </Link>
      </figure>
    </>
  );
}
