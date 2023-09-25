import { useState, useEffect } from "react";

export const getServerSideProps = () => {
  const mykey = process.env.API_KEY;

  return {
    props: {
      env: mykey,
    },
  };
};

export default function Recipe({ env }) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/716429/information?apiKey=${env}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <div>
      <h1>{JSON.stringify(data)}</h1>
      <p>this is a paragraph</p>
    </div>
  );
}
