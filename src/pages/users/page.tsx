type User = {
  id: string;
  email: string;
};

export function UserPage() {
  return (
    <main className="mx-auto flex flex-col p-4 pt-10">
      <h1 className="flex items-center justify-center text-2xl font-bold">
        Users
      </h1>
      <section className="mt-2 flex items-center justify-center">
       <CreateUserForm />
      </section>
      <section className="flex flex-col items-center justify-center">
        <UsersList
          users={[
            { id: '1', email: 'some@gmail.com' },
            { id: '2', email: 'somasdase@gmail.com' },
          ]}
        />
      </section>
    </main>
  );
}
export function CreateUserForm(){
return(
  <form className="mx-auto flex gap-2">
  <input type="email" className="border-2 border-blue-500" />
  <button
    className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
    type="submit"
  >
    ADD
  </button>
</form>
)
};

export function UsersList({ users }: { users: User[] }) {
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
      <button
        type="button"
        className="ml-auto text-red-500"
        
      >
        Delete
      </button>
    </div>
  );
}
