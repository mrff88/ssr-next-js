import Link from "next/link";
import style from "../../styles/Characters.module.css";
import Layout from "../../components/layout";
import Head from "next/head";

export default function CharactersPage({ characters }) {
  console.log(characters);

  return (
    <Layout>
      <Head>
        <title>Characters</title>
      </Head>
      <div className={style.container}>
        {characters.map((item) => (
          <div key={item.id}>
            <Link
              href={"/characters/details/id"}
              as={`/characters/details/${item.id}`}
            >
              <a>Character: {item.name}</a>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
}

const getAllCharacters = async () => {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  const jsonData = await response.json();
  return jsonData.results;
};

export async function getStaticProps(context) {
  const data = await getAllCharacters();
  console.log(context);
  return {
    props: {
      characters: data,
    }, // will be passed to the page component as props
  };
}
