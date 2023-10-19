import { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { NextPageWithProps } from "@/pages/_app";
import useUser from "@/hooks/useUser";

const Token: NextPageWithProps = () => {
  const {
    query: { token },
    push,
  } = useRouter();
  const { login } = useUser();

  useEffect(() => {
    if (token) {
      login(token as string);
      push("/");
    }
  }, [token, login, push]);

  return <h1>{token}</h1>;
};

Token.getLayout = (page: ReactElement) => page;
Token.Anonymous = true;

export default Token;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "zh-TW", [""])),
    },
  };
};
