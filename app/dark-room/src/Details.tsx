import { useParams } from "react-router-dom";

function Details() {
  const { id } = useParams(); // Destructure the 'id' parameter

  return (
    <main className="min-h-screen min-dvh-screen flex flex-col items-center justify-center w-full">
      {id && (
        <img
          loading="lazy"
          src={`https://www.darkroom.cfd/images/${id.replace("reduced-", "")}`}
          className="transparent-border-img w-full max-w-[74rem]"
          alt="details"
        />
      )}
    </main>
  );
}

export default Details;
