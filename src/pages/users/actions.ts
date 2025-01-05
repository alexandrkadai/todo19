import { createUser } from '../../shared/api';

type CreateActionState = null | {
    defaultEmail: string;
    defaultName: string;
    error? : string;
};

export const createUserAction =
  ({
    refetchUsers,
    setEmail,
    setName,
  }: {
    refetchUsers: () => void;
    setEmail: (email: string) => void;
    setName: (name: string) => void;
  }) =>
  async (
    prevState: CreateActionState,
    formData: { email: string; name: string }
  ): Promise<CreateActionState> => {
    try {
        await createUser({
            id: crypto.randomUUID(),
            name: formData.name,
            email: formData.email,
          });
      
          refetchUsers();
          setName('');
          setEmail('');
          return {
            defaultEmail: "",
            defaultName: "",
          }
    } catch (error) {
        return {
            defaultEmail: formData.email,
            defaultName: formData.name,
            error: (error as Error).message,
          }
    }
   
  };
