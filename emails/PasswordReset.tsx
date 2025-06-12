import {
  Button,
  Html,
  Section,
  Row,
  Column,
  Img,
  Head,
  Text,
  Font,
  Heading,
  Tailwind,
} from "@react-email/components";
import Fonts from "./components/Fonts";

export default function PasswordResetEmail(props: {
  name: string;
  url: string;
}) {
  return (
    <Html>
      <Head>
        <title>Zresetuj swoje hasło w PizzaHub</title>
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
                <Heading as="h1">Zresetuj swoje hasło</Heading>
                <Text>Cześć {props.name},</Text>
                <Text>
                  Otrzymaliśmy prośbę o zresetowanie hasła do Twojego konta w
                  serwisie PizzaHub. Kliknij przycisk poniżej, aby ustawić nowe
                  hasło.
                </Text>
                <Text>
                  Ten link do zresetowania hasła wygaśnie za 60 minut.
                </Text>
                <Text>
                  Jeżeli to nie Ty prosiłeś o zmianę hasła, zignoruj tę
                  wiadomość. Twoje konto pozostanie bezpieczne.
                </Text>
              </Column>
            </Row>

            <Row>
              <Column align="center">
                <Button
                  href={props.url}
                  target="_blank"
                  className="px-10 py-6 bg-red-700 text-white"
                >
                  Zresetuj hasło
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
                Jeśli masz jakieś pytania, skontaktuj się z nami pod adresem{" "}
                <a href="mailto:kontakt@pizzahub.pl" className="text-red-700">
                  kontakt@pizzahub.pl
                </a>
                .
              </Text>
            </Column>
          </Row>
        </Section>
      </Tailwind>
    </Html>
  );
}
