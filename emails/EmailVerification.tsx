import { Button, Html, Section, Row, Column, Img, Head, Text, Font, Heading, Tailwind } from "@react-email/components";
import Fonts from "./components/Fonts";

export default function EmailVerification(props: { name: string; url: string }) {
  return (
    <Html>
      <Head>
        <title>Zweryfikuj swój adres email</title>
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
                <Heading as="h1">Zweryfikuj swój adres email</Heading>
                <Text>Cześć {props.name},</Text>
                <Text>Witaj w PizzaHub!</Text>
                <Text>Proszę kliknij przycisk poniżej aby zweryfikować twój adres email.</Text>
                <Text>
                  Jeżeli nie rejestrowałeś się na PizzaHub, proszę zignorować ten email lub skontaktuj się z nami na{" "}
                  <a href="mailto:kontakt@pizzahub.pl" className="text-red-700">
                    kontakt@pizzahub.pl
                  </a>
                </Text>
                <Text>
                  Pozdrawiamy <br /> Zespół PizzaHub
                </Text>
              </Column>
            </Row>
            <Row>
              <Column align="center">
                <Button href={props.url} target="_blank" className="px-10 py-6 bg-red-700 text-white">
                  Zweryfikuj email
                </Button>
              </Column>
            </Row>
          </Section>
          <Row>
            <Column>
              <Heading as="h4">Potrzebujsz pomocy?</Heading>
              <Text>
                Jeśli masz jakieś pytania, komentarze lub sugestie, możesz do nas napisać. Chętnie rozwiążemy Twoje
                problemy.
              </Text>
            </Column>
          </Row>
        </Section>
      </Tailwind>
    </Html>
  );
}
