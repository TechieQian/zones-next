import React from "react";
import { getSession } from "next-auth/react";

interface FormProps {
  permissioned: boolean;
}
function Form({ permissioned }: FormProps) {
  return (
    <div>
      {permissioned ? (
        <div>yaya me</div>
      ) : (
        <div>You do not have permissions to view this page</div>
      )}
    </div>
  );
}

export default Form;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  const permissioned =
    (session?.user?.email &&
      process.env.ADMIN_USERS &&
      process.env.ADMIN_USERS.split(",").includes(session.user.email)) === true;
  return {
    props: {
      permissioned,
    },
  };
}
