import { createUser } from "../../shared/api";

type CreateActionState ={};

export const createUserAction = ({refetchUsers, setEmail, setName}: refetchUsers: () => Promise<void>, setEmail: (email:string) => void, setName: (name: string) => void  ) = async (prevState: CreateActionState, formData: {email: string, name: string}) : Promise<CreateActionState>=> {
    await createUser({
        id: crypto.randomUUID(),
        name: formData.name,
        email:formData.email,
      });

      refetchUsers();
      setName('');
      setEmail('');
};