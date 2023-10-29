import { getSession } from "next-auth/react";
import Layout from "../../components/profile/layout";

export default function index({ user, tab }) {
  console.log(user);
  return (
    <Layout session={user.user} tab={tab}>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const { query, req } = ctx;
  const session = await getSession({ req });
  console.log(session); 
  const tab = query.tab || 0;
  return {
    props: {
      user: session,
      tab,
    },
  };
}
