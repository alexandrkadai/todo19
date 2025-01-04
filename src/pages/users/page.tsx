import { startTransition, Suspense, use, useActionState, useState, useTransition } from 'react';
import { createUser, deleteUser, fetchUsers } from '../../shared/api';
import { ErrorBoundary } from 'react-error-boundary';

type User = {
  id: string;
  name: string;
  email: string;
};

const defaultUsersPromise = fetchUsers();

export function UserPage() {
  const [usersPromise, setUsersPromise] = useState(defaultUsersPromise);

  const refetchUsers = () =>
    startTransition(() => setUsersPromise(fetchUsers()));

  return (
    <main className="mx-auto flex flex-col p-4 pt-10">
      <h1 className="flex items-center justify-center text-2xl font-bold">
        Users
      </h1>
      <section className="mt-2 flex items-center justify-center">
        <CreateUserForm refetchUsers={refetchUsers} />
      </section>
      <ErrorBoundary
        fallbackRender={(e) => (
          <div className="mt-5 flex items-center justify-center text-red-500">
            Somethi went worng {JSON.stringify(e)}
          </div>
        )}
      >
        <section className="flex flex-col items-center justify-center">
          <Suspense fallback={<div>Loading .... </div>}>
            <UsersList
              usersPromise={usersPromise}
              refetchUsers={refetchUsers}
            />
          </Suspense>
        </section>
      </ErrorBoundary>
    </main>
  );
}
export function CreateUserForm({ refetchUsers }: { refetchUsers: () => void }) {
  const [] = useActionState();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const [isePending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
     
    });
  };

  return (
    <form className="mx-auto flex flex-col gap-2" onSubmit={handleSubmit}>
      <label htmlFor="name">Enter Name</label>
      <input
        name="name"
        type="text"
        className="border-2 border-blue-500"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="email">Enter Email</label>
      <input
        name="email"
        type="email"
        className="border-2 border-blue-500"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:bg-gray-300"
        type="submit"
        disabled={isePending}
      >
        ADD
      </button>
    </form>
  );
}

export function UsersList({
  usersPromise,
  refetchUsers,
}: {
  usersPromise: Promise<User[]>;
  refetchUsers: () => void;
}) {
  const users = use(usersPromise);

  return (
    <>
      <h2 className="mt-5 flex items-center justify-center text-xl font-bold">
        Users List
      </h2>
      <div className="flex flex-col">
        {users.map((user) => (
          <UserCard user={user} key={user.id} refetchUsers={refetchUsers} />
        ))}
      </div>
    </>
  );
}

export function UserCard({
  user,
  refetchUsers,
}: {
  user: User;
  refetchUsers: () => void;
}) {
  const [isePending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      await deleteUser(user.id);
      refetchUsers();
    });
  };

  return (
    <div className="m-2 flex w-[350px] gap-5 rounded border bg-gray-100 p-2">
      {user.name}
      {user.email}
      <button
        onClick={handleDelete}
        type="button"
        className="ml-auto text-red-500 disabled:text-black hover:text-red-800"
        disabled={isePending}
      >
        Delete
      </button>
    </div>
  );
}
