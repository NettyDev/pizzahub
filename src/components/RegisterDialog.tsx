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
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

const FormSchema = z
  .object({
    name: z.string().min(1, "Imię jest wymagane"),
    surname: z.string().min(1, "Nazwisko jest wymagane"),
    email: z.string().email("Nieprawidłowy adres email").min(1, "Email jest wymagany"),
    password: z.string().min(8, "Hasło musi mieć od 8 do 28 znaków").max(28, "Hasło musi mieć od 8 do 28 znaków"),
    confirmPassword: z.string(),
    agreement1: z.boolean().refine((val) => val, {
      message: "Musisz zaakceptować regulamin"
    })
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
      confirmPassword: "",
      agreement1: false
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
          toast.success("Konto utworzono pomyślnie. Sprawdź swoją skrzynkę e-mail, aby zweryfikować adres.");
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
          <form
            onSubmit={form.handleSubmit(onSubmit, (errors) => {
              console.log("Form errors:", errors);
              const formatKey = (key: string) => {
                switch (key) {
                  case "contact":
                    return "Dane kontaktowe";
                  case "delivery":
                    return "Dane dostawy";
                  case "company":
                    return "Dane firmy";
                  default:
                    return key;
                }
              };
              if (Object.keys(errors).length > 0) {
                toast.error(
                  <ul>
                    {Object.values(errors).map((error, idx) => {
                      if (!("message" in error)) {
                        return (
                          <li>
                            <p>{formatKey(Object.keys(errors)[idx])}</p>
                            <ul className="pl-4 list-disc">
                              {Object.values(error).map((subError) => (
                                <li key={subError.message}>{subError.message}</li>
                              ))}
                            </ul>
                          </li>
                        );
                      } else return <li>{error.message}</li>;
                    })}
                  </ul>
                );
              }
            })}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imię</FormLabel>
                  <FormControl>
                    <Input placeholder="Tomasz" {...field} />
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
                    <Input placeholder="Kowalski" {...field} />
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
                    <Input placeholder="mail@example.com" type="email" {...field} />
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
                    <Input placeholder="********" type="password" {...field} />
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
                    <Input placeholder="********" type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex items-start space-x-3">
              <FormField
                name="agreement1"
                control={form.control}
                render={({ field: { value, onChange } }) => (
                  <Checkbox
                    id="terms"
                    checked={value}
                    onCheckedChange={onChange}
                    className="mt-0.5 border-stone-400 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 focus:ring-offset-0 focus:ring-2 focus:ring-red-500"
                  />
                )}
              />

              <Label htmlFor="terms" className="text-xs sm:text-sm leading-snug cursor-pointer">
                Akceptuję regulamin i politykę prywatności serwisu PizzaHub
              </Label>
            </div>
            <Button type="submit">Załóż konto</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
