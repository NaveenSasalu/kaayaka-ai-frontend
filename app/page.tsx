export default async function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  return (
    <div>
      <h1>Frontend Running</h1>
      <p>API URL: {apiUrl}</p>
    </div>
  );
}
