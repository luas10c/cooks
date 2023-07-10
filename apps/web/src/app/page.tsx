interface Props {
  children: React.ReactNode;
}

const Home = (props: Props) => {
  return (
    <header className="bg-red-500 h-24 flex items-center justify-center">
      <h2 className="text-2xl uppercase font-bold">Home</h2>
    </header>
  )
}

export default Home