import { useState } from 'react';

type User = {
  id: string;
  email: string;
};

export function UserPage() {
  const [users, setUsers] = useState<User[]>([]);

  return (
    <>
      <h1 className="">Users</h1>
      <section className="">
        <form action="" className="">

        </form>
      </section>
      <section className="">
        <h2 className="text-2xl">Users List</h2>
        <ul>
          {users.map((user) => (
            <li>{user.email}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
