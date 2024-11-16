import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from '@/constans/routes';



const Home = async () => {

  const session = await auth();

  console.log(session);
  return (
    <>
    <h1 className="text-3xl font-bold">Hello</h1>
    </>
   
  );
}

export default Home