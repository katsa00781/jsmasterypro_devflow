import Link from "next/link";


import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constans/routes";
import { api } from "@/lib/handlers/api";


const Home = async () => {

  const test = async () => {
    const users = await api.users.getAll();
    return users;
  }

  const users = await test();
  console.log(users);

  
  return (
  <>
  <section className="flex w-full flex-col-reverse justify-between
  gap-4 sm:flex-row sm:items-center">
    <h1 className="h1-bold text-dark100_light900">All Questions</h1>
    <Button className="primary-gradient min-h-[46px] px-4 py-3
    !text-light-900"
    asChild>
      <Link href={ROUTES.ASK_QUESTION}>Ask a question</Link>
    </Button>
  </section>
  <section className="mt-11">
    <LocalSearch
    route="/"
    imgsrc="/icons/search.svg"
    placeholder="Search..."
    otherClasses= "flex-1"
    />
  </section>
  HomeFilter
  <div className="mt-10 flex flex-col gap-6"  >
    <p>Question Card</p>
    <p>Question Card</p>
    <p>Question Card</p>
    <p>Question Card</p>
  </div>
  </>
  );
};

export default Home;
