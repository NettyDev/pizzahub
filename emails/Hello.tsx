import { Button, Html, Section, Row, Column, Img, Head, Text, Font, Heading, Tailwind } from "@react-email/components";
import Fonts from "./components/Fonts";

export default function Hello(props: { name: string; url: string }) {
  return (
    <Html>
      <Head>
        <title>Witaj w PizzaHub!</title>
        <Fonts />
      </Head>
      <Tailwind>
        <Section className="max-w-xl">
          <Row>
            <Column align="center">
              <Img height={100} src="http://localhost:3000/logo.svg" />
            </Column>
          </Row>
          <Section className="p-7">
            <Row>
              <Column>
                <Heading as="h1">Witaj w PizzaHub, {props.name}!</Heading>
                <Text>Cześć {props.name},</Text>
                <Text>
                  Dziękujemy za rejestrację w naszym serwisie! Cieszymy się, że do nas dołączyłeś. Twoje konto zostało
                  pomyślnie utworzone.
                </Text>
                <Text>
                  Od teraz możesz zamawiać swoją ulubioną pizzę szybko i wygodnie. Kliknij przycisk poniżej, aby przejść
                  do serwisu i złożyć swoje pierwsze zamówienie.
                </Text>
              </Column>
            </Row>
            <Row>
              <Column align="center">
                <Button href={props.url} target="_blank" className="px-10 py-6 bg-red-700 text-white">
                  Zacznij zamawiać
                </Button>
              </Column>
            </Row>

            <Row>
              <Column>
                <Text className="pt-6">
                  Pozdrawiamy, <br /> Zespół PizzaHub
                </Text>
              </Column>
            </Row>
          </Section>
          <Row>
            <Column>
              <Heading as="h4">Potrzebujesz pomocy?</Heading>
              <Text>
                Jeśli masz jakieś pytania, komentarze lub sugestie, możesz do nas napisać na{" "}
                <a href="mailto:kontakt@pizzahub.pl" className="text-red-700">
                  kontakt@pizzahub.pl
                </a>
                . Chętnie rozwiążemy Twoje problemy.
              </Text>
            </Column>
          </Row>
        </Section>
      </Tailwind>
    </Html>
  );
}
