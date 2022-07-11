import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { CreateUserInput } from "../server/schema/user.schema";
import { trpc } from "../utils/trpc";

function RegisterPage() {
  const { handleSubmit, register } = useForm<CreateUserInput>();
  const router = useRouter();

  const { mutate, error } = trpc.useMutation(["users.register-user"], {
    onSuccess: () => {
      router.push("./login");
    },
  });

  const onSubmit = (values: CreateUserInput) => {
    mutate(values);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Register</h1>
        <input
          type="email"
          placeholder="fake@fake.com"
          {...register("email")}
        />
        <br />
        <input type="text" placeholder="Tom" {...register("name")} />
        <button type="submit">Register</button>
        {error && error.message}
      </form>
      <Link href={"/login"}>Login</Link>
    </>
  );
}

export default RegisterPage;
