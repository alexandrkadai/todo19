import { useState } from 'react';

type User = {
  id: string;
  email: string;
};

export function UserPage() {
  const [users, setUsers] = useState<User[]>([]);

  return (
    <>
      <h1 className="flex items-center justify-center text-2xl font-bold">
        Users
      </h1>
      <section className="mt-2">
        <form action="" className=""></form>
      </section>
      <section className="">
        <h2 className="flex items-center justify-center text-xl font-bold">
          Users List
        </h2>
        <ul>
          {users.map((user) => (
            <li>{user.email}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
