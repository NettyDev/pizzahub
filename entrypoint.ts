import { $, sql } from "bun";

console.log("Sprawdzanie zmiennej BETTER_AUTH_SECRET");
if (!process.env.BETTER_AUTH_SECRET) {
  console.log("Brak ustawionej zmiennej BETTER_AUHT_SECRET. Generowanie...");
  const secret = await $`head /dev/urandom | tr -dc A-Za-z0-9 | head -c 16 | base64`.text();

  $.env({
    BETTER_AUTH_SECRET: secret
  });
  console.log("Zmienna BETTER_AUTH_SECRET została ustawiona");
} else {
  console.log("Zmienna BETTER_AUTH_SECRET jest już zdefiniowana");
}

console.log("Stosowanie migracji Prisma");
await $`bunx prisma migrate deploy`;

type User = { name: string; surname: string; email: string }[];

try {
  console.log("Sprawdzanie dostępności danych testowych");
  const user = (await sql`SELECT count(*) FROM public.user`.values())[0][0];
  const account = (await sql`SELECT count(*) FROM public.account`.values())[0][0];
  const ingredient = (await sql`SELECT count(*) FROM public.ingredient`.values())[0][0];
  const pizza = (await sql`SELECT count(*) FROM public.pizza`.values())[0][0];
  const pizza_ingredient = (await sql`SELECT count(*) FROM public.pizza_ingredient`.values())[0][0];
  const pizza_toppings_ingredient = (await sql`SELECT count(*) FROM public.pizza_toppings_ingredient`.values())[0][0];
  const counters = { user, account, ingredient, pizza, pizza_ingredient, pizza_toppings_ingredient };
  console.table(counters);
  const tablesMissing = Object.keys(counters).filter((v) => counters[v as keyof typeof counters] < 1);
  if (tablesMissing.length > 0) {
    console.log(`Brak danych dla tabeli: ${tablesMissing.toString().replaceAll(",", ", ")}`);
    console.log("Uzupełnianie brakujących danych");
    if (user < 1) {
      console.log("Uzupełnianie tabeli: user");
      await sql.file("./sql/user.sql");
    }
    if (account < 1) {
      console.log("Uzupełnianie tabeli: account");
      await sql.file("./sql/account.sql");
    }
    if (ingredient < 1) {
      console.log("Uzupełnianie tabeli: ingredient");
      await sql.file("./sql/ingredient.sql");
    }
    if (pizza < 1) {
      console.log("Uzupełnianie tabeli: pizza");
      await sql.file("./sql/pizza.sql");
    }
    if (pizza_ingredient < 1) {
      console.log("Uzupełnianie tabeli: pizza_ingredient");
      await sql.file("./sql/pizza_ingredient.sql");
    }
    if (pizza_toppings_ingredient < 1) {
      console.log("Uzupełnianie tabeli: pizza_toppings_ingredient");
      await sql.file("./sql/pizza_toppings_ingredient.sql");
    }
    console.log("Dane testowe zostały uzupełnione");
  }
  const userData: User = await sql`SELECT name, surname, email, ${sql("emailVerified")}, role FROM public.user`;
  console.log("List użytkowników testowych");
  console.table(userData);
} catch (err) {
  console.log("Wystąpił błąd podczas sprawdzania danych testowych. Błąd:", err);
}

interface ModelData {
  models: {
    name: string;
  }[];
}

try {
  if (process.env.AI_URL && process.env.LLM) {
    console.log("Sparwdzanie dostępności modelu AI");
    const data: ModelData = await (await fetch(`${process.env.AI_URL}/api/tags`)).json();
    if (!data.models.find((v) => v.name == process.env.LLM)) {
      console.log(`Model ${process.env.LLM} nie jest dostępny. Rozpoczynam pobieranie...`);
      const response = await fetch(`${process.env.AI_URL}/api/pull`, {
        method: "POST",
        body: JSON.stringify({ model: process.env.LLM, stream: true })
      });
      const decoder = new TextDecoder();
      if (response.body) {
        const reader = response.body.getReader();
        let done = false;
        while (!done) {
          const { value, done: streamDone } = await reader.read();
          done = streamDone;
          if (value) {
            const decodedChunk = decoder.decode(value);
            try {
              const jsonChunk = JSON.parse(decodedChunk);

              if (jsonChunk.status) console.log("Ollama:", jsonChunk.status);
              if (jsonChunk.error) console.log("Ollama error:", jsonChunk.error);
              if (jsonChunk.status == "success") console.log(`Model ${process.env.LLM} został pobrany`);
            } catch (err) {
              console.log("Błąd parsowania JSON: ", err, "Otrzymany chunk:", decodedChunk);
            }
          }
        }
      } else {
        console.log("Brak body w odpowiedzi fetch.");
      }
    } else {
      console.log(`Model ${process.env.LLM} jest dostępny`);
    }
  } else {
    console.log("Nie zdefiniowano zmiennych AI_URL lub LLM");
  }
} catch (err) {
  console.log("Nie można nawiązać połączenia z Ollama. Błąd:", err);
}
if (process.env.NODE_ENV == "production") await $`bun server.js`;
