"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "./ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useState } from "react";

const FormSchema = z.object({
  email: z.string(),
  password: z.string()
});

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const [isPasswordResetOpen, setIsPasswordResetOpen] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    const { data, error } = await authClient.signIn.email(
      {
        email: formData.email,
        password: formData.password
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
            case "USER_ALREADY_EXISTS":
              toast.error("Wystąpił błąd", { description: "Użytkownik już istnieje" });
              break;
            case "EMAIL_NOT_VERIFIED":
              toast.error("Wystąpił błąd", { description: "Email nie został zweryfikowany" });
              break;
            default:
              toast.error("Wystąpił błąd", { description: ctx.error.message });
          }
          console.error(ctx.error);
        },
        onSuccess: (ctx) => {
          toast.success("Zalogowano pomyślnie");
          onOpenChange(false);
          form.reset();
        }
      }
    );
  }
  return (
    <>
      <Dialog {...{ open, onOpenChange }}>
        <DialogContent className="max-w-70 w-auto">
          <DialogHeader>
            <DialogTitle>Logowanie</DialogTitle>
            <DialogDescription>Tutaj możesz zalogować się do naszego portalu.</DialogDescription>
          </DialogHeader>
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
                <Button
                  type="submit"
                  className="bg-red-600 text-white hover:bg-red-700 focus:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white transition-colors duration-200"
                >
                  Zaloguj się
                </Button>
                <a href="#" onClick={() => setIsPasswordResetOpen(true)}>
                  Nie pamiętam hasła
                </a>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
      <PasswordResetDialog
        open={isPasswordResetOpen}
        onOpenChange={(open) => {
          setIsPasswordResetOpen(open);
        }}
        close={() => {
          onOpenChange(false);
        }}
      />
    </>
  );
}

function PasswordResetDialog({
  open,
  onOpenChange,
  close
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  close?: () => void;
}) {
  const [email, setEmail] = useState("");
  return (
    <Dialog {...{ open, onOpenChange }}>
      <DialogContent className="max-w-70 w-auto">
        <DialogHeader>
          <DialogTitle>Resetowanie hasła</DialogTitle>
          <DialogDescription>Tutaj możesz zresetować swoje hasło.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Input
            placeholder="mail@example.com"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            className="bg-red-600 text-white hover:bg-red-700 focus:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white transition-colors duration-200"
            onClick={() => {
              authClient
                .forgetPassword({
                  email: email,
                  redirectTo: "/"
                })
                .then(() => {
                  toast.success("Link do resetowania hasła został wysłany na podany adres e-mail.");
                  onOpenChange(false);
                  close?.();
                })
                .catch((error) => {
                  switch (error.code) {
                    case "INVALID_EMAIL":
                      toast.error("Wystąpił błąd", { description: "Nieprawidłowy adres email" });
                      break;
                    case "EMAIL_NOT_VERIFIED":
                      toast.error("Wystąpił błąd", { description: "Email nie został zweryfikowany" });
                      break;
                    default:
                      toast.error("Wystąpił błąd", { description: error.message });
                  }
                  console.error(error);
                });
            }}
          >
            Resetuj hasło
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
