"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "./ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const FormSchema = z
  .object({
    name: z.string(),
    surname: z.string(),
    email: z.string(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8)
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Hasła nie są identyczne",
        path: ["confirmPassword"]
      });
    }
  });

interface RegisterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RegisterDialog({ open, onOpenChange }: RegisterDialogProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    const { data, error } = await authClient.signUp.email(
      {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        surname: formData.surname
      },
      {
        onError: (ctx) => {
          switch (ctx.error.code) {
            case "INVALID_EMAIL":
              toast.error("Wystąpił błąd", { description: "Nieprawidłowy adres email" });
              break;
            case "INVALID_EMAIL_OR_PASSWORD":
              toast.error("Wystąpił błąd", { description: "Nieprawidłowy email lub hasło" });
              break;
            default:
              toast.error("Wystąpił błąd", { description: ctx.error.message });
          }
          console.error(ctx.error);
        },
        onSuccess: (ctx) => {
          toast.success("Konto utworzono pomyślnie");
          onOpenChange(false);
          form.reset();
        }
      }
    );
  }
  return (
    <Dialog {...{ open, onOpenChange }}>
      <DialogContent className="max-w-70 w-auto">
        <DialogHeader>
          <DialogTitle>Rejestracja</DialogTitle>
          <DialogDescription>Tutaj możesz założyć konto na naszym portalu.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imię</FormLabel>
                  <FormControl>
                    <Input placeholder="Tomasz" required {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nazwisko</FormLabel>
                  <FormControl>
                    <Input placeholder="Kowalski" required {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="mail@example.com" required type="email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hasło</FormLabel>
                  <FormControl>
                    <Input placeholder="********" required type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Powtórz hasło</FormLabel>
                  <FormControl>
                    <Input placeholder="********" required type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Załóż konto</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
