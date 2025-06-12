import {
  Button,
  Html,
  Section,
  Row,
  Column,
  Img,
  Head,
  Text,
  Heading,
  Tailwind,
} from "@react-email/components";
import Fonts from "./components/Fonts";

interface OrderDeliveredEmailProps {
  name: string;
  orderId: string;
  hasAccount: boolean;
  rateOrderUrl: string;
  createAccountUrl: string;
}

export default function OrderDeliveredEmail(props: OrderDeliveredEmailProps) {
  const { name, orderId, hasAccount, rateOrderUrl, createAccountUrl } = props;

  return (
    <Html>
      <Head>
        <title>Twoje zamówienie nr {orderId} zostało dostarczone!</title>
        <Fonts />
      </Head>
      <Tailwind>
        <Section className="max-w-xl bg-white">
          <Row>
            <Column align="center">
              <Img height={100} src="http://localhost:3000/logo.svg" />
            </Column>
          </Row>
          <Section className="p-7">
            <Row>
              <Column>
                <Heading as="h1">Smacznego!</Heading>
                <Text>Cześć {name},</Text>
                <Text>
                  Chcieliśmy poinformować, że Twoje zamówienie o numerze{" "}
                  <strong>{orderId}</strong> zostało pomyślnie dostarczone. Mamy
                  nadzieję, że wszystko smakowało wyśmienicie!
                </Text>
              </Column>
            </Row>

            {hasAccount ? (
              <>
                <Row>
                  <Column>
                    <Heading as="h2" className="text-lg font-semibold mt-6">
                      Oceń swoje zamówienie
                    </Heading>
                    <Text>
                      Twoja opinia jest dla nas bardzo ważna! Pomaga nam stawać
                      się jeszcze lepszymi. Poświęć chwilę, aby ocenić swoje
                      zamówienie i podzielić się wrażeniami.
                    </Text>
                  </Column>
                </Row>
                <Row>
                  <Column align="center" className="pt-4">
                    <Button
                      href={rateOrderUrl}
                      target="_blank"
                      className="px-10 py-6 bg-red-700 text-white"
                    >
                      Oceń zamówienie
                    </Button>
                  </Column>
                </Row>
              </>
            ) : (
              <>
                <Row>
                  <Column>
                    <Heading as="h2" className="text-lg font-semibold mt-6">
                      Spodobało Ci się? Dołącz do nas!
                    </Heading>
                    <Text>
                      Załóż konto w PizzaHub, aby zamawiać jeszcze szybciej,
                      śledzić historię zamówień i korzystać z wyjątkowych
                      promocji w przyszłości.
                    </Text>
                  </Column>
                </Row>
                <Row>
                  <Column align="center" className="pt-4">
                    <Button
                      href={createAccountUrl}
                      target="_blank"
                      className="px-10 py-6 bg-red-700 text-white"
                    >
                      Załóż darmowe konto
                    </Button>
                  </Column>
                </Row>
              </>
            )}

            <Row>
              <Column>
                <Text className="pt-6">
                  Pozdrawiamy serdecznie, <br /> Zespół PizzaHub
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
