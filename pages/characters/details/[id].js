import { useRouter } from "next/router";
import Image from "next/image";

const Details = ({ character }) => {
  const router = useRouter();
  console.log(character);

  if (router.isFallback) return <div>loading...</div>;

  return (
    <div>
      Details by id: {character.name}
      <Image
        src={character.image}
        alt={character.id}
        width={500}
        height={500}
      />
    </div>
  );
};

const getAllCharacters = async () => {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  const jsonData = await response.json();
  return jsonData.results.map((item) => {
    return {
      params: {
        id: item.id.toString(),
      },
    };
  });
};

const getCharacterById = async (id) => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${id}`
  );
  const jsonData = await response.json();
  return jsonData;
};

export const getStaticPaths = async () => {
  const data = await getAllCharacters();

  return {
    paths: data,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { id } = params;
  const data = await getCharacterById(id);
  return {
    props: {
      character: data,
    }, // will be passed to the page component as props
  };
};

export default Details;
