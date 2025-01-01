import { Suspense, use, useState } from 'react';
import { createUser, fetchUsers } from '../../shared/api';

type User = {
  id: string;
  name: string;
  email: string;
};

const defaultUsersPromise = fetchUsers();

export function UserPage() {
  const [usersPromise, setUsersPromise] = useState(defaultUsersPromise);
  const refetchUsers = () => {
    setUsersPromise(fetchUsers());
  };
  return (
    <main className="mx-auto flex flex-col p-4 pt-10">
      <h1 className="flex items-center justify-center text-2xl font-bold">
        Users
      </h1>
      <section className="mt-2 flex items-center justify-center">
        <CreateUserForm refetchUsers={refetchUsers} />
      </section>
      <section className="flex flex-col items-center justify-center">
        <Suspense fallback={<div>Loading .... </div>}>
          <UsersList usersPromise={usersPromise} />
        </Suspense>
      </section>
    </main>
  );
}
export function CreateUserForm({ refetchUsers }: { refetchUsers: () => void }) {
  const [email,setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) =>{
    e.preventDefault();
   await createUser({
       id: crypto.randomUUID(), 
        name,
        email, 
    });
    refetchUsers();
    setName("");
    setEmail("");
  };

  return (
    <form className="mx-auto flex flex-col gap-2" onSubmit={handleSubmit}>

      <label htmlFor="name">Enter Name</label>
      <input name="name" type="text" className="border-2 border-blue-500" value={name} onChange={(e) => setEmail(e.target.value)}/>
      <label htmlFor="email">Enter Email</label>
      <input name="email" type="email" className="border-2 border-blue-500" value={email} onChange={(e) => setName(e.target.value)}/>
      <button
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        type="submit"
      >
        ADD
      </button>
    </form>
  );
}

export function UsersList({ usersPromise }: { usersPromise: Promise<User[]> }) {
  const users = use(usersPromise);

  return (
    <>
      <h2 className="mt-5 flex items-center justify-center text-xl font-bold">
        Users List
      </h2>
      <div className="flex flex-col">
        {users.map((user) => (
          <UserCard user={user} key={user.id} />
        ))}
      </div>
    </>
  );
}

export function UserCard({ user }: { user: User }) {
  return (
    <div className="m-2 flex w-[350px] rounded border bg-gray-100 p-2">
      {user.email}
      <button type="button" className="ml-auto text-red-500">
        Delete
      </button>
    </div>
  );
}
