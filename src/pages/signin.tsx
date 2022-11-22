import { GetServerSidePropsContext } from "next";
import { getProviders, getSession, signIn } from "next-auth/react";
import Head from "next/head";
import Header from "../components/Header";
import { provider } from "../types/typings";

type Props = {
  providers: provider[];
};

const SignIn = ({ providers }: Props) => {
  return (
    <div className="h-screen">
      <Head>
        <title>Travel - Sign In</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Header */}
      <Header />
      {/* Main */}
      <main className="h-[80%]">
        {Object.values(providers).map((provider) => (
          <div className="relative h-[80%]">
            <div
              className="absolute top-1/2 w-full text-center"
              key={provider.name}
            >
              <button
                className="text-red-600 bg-white border px-10 py-4 shadow-md rounded-full font-bold my-3 hover:shadow-xl active:scale-90 transition duration-150"
                onClick={() => signIn(provider.id)}
              >
                Sign in with {provider.name}
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default SignIn;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      providers: await getProviders(),
    },
  };
};
