import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Logo from "@/public/assets/images/logo-black.png";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const LoginPage = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-center">
          <Image
            src={Logo}
            className="max-w-[150px] h-auto"
            alt="logoImg"
            priority
          />
        </div>
        <CardTitle className="w-full text-center text-3xl font-bold font-[Pacifico] text-orange-500">
          Login Into Account
        </CardTitle>
        <p>Login into your account by filling out the form below.</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(LoginSubmitHandler)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="************"
                      type={isTypePassword ? "password" : "text"}
                      {...field}
                    />
                  </FormControl>
                  <button
                    type="button"
                    className="absolute right-4 top-[38px] cursor-pointer"
                    onClick={() => setIsTypePassword(!isTypePassword)}
                  >
                    {isTypePassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
