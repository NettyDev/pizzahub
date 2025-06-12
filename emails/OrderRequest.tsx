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
  Hr,
} from "@react-email/components";
import Fonts from "./components/Fonts";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderConfirmationEmailProps {
  name: string;
  orderId: string;
  orderDate: string;
  items: OrderItem[];
  total: number;
  deliveryAddress: string;
  estimatedDeliveryTime: string;
  orderUrl: string;
}

export default function OrderConfirmationEmail(
  props: OrderConfirmationEmailProps
) {
  //   const {
  //     name,
  //     orderId,
  //     orderDate,
  //     items,
  //     total,
  //     deliveryAddress,
  //     estimatedDeliveryTime,
  //     orderUrl,
  //   } = props;

  const {
    name,
    orderId,
    orderDate,
    items,
    total,
    deliveryAddress,
    estimatedDeliveryTime,
    orderUrl,
  }: OrderConfirmationEmailProps = {
    name: "nadusia",
    orderId: "12345-ABCDE",
    orderDate: "16 stycznia 2025, 18:35",
    items: [
      { name: "Miss Klasyki", quantity: 1, price: 30.0 },
      { name: "Piko Bello", quantity: 1, price: 35.0 },
    ],
    total: 75.0,
    deliveryAddress: "ul. Andromedy 12/3, 00-001 Warszawa",
    estimatedDeliveryTime: "30-45 minut",
    orderUrl: "https://pizzahub.pl/moje-konto/zamowienia/12345-ABCDE",
  };
  return (
    <Html>
      <Head>
        <title>Potwierdzenie zamówienia nr {orderId}</title>
        <Fonts />
      </Head>
      <Tailwind>
        <Section className="max-w-xl bg-white">
          {/* Sekcja z logo */}
          <Row>
            <Column align="center">
              <Img height={100} src="http://localhost:3000/logo.svg" />
            </Column>
          </Row>

          {/* Główna treść maila */}
          <Section className="p-7">
            <Row>
              <Column>
                <Heading as="h1">Dziękujemy za Twoje zamówienie!</Heading>
                <Text>Cześć {name},</Text>
                <Text>
                  Twoje zamówienie o numerze <strong>{orderId}</strong> z dnia{" "}
                  {orderDate} zostało przyjęte i jest właśnie przygotowywane.
                  Poniżej znajdziesz jego szczegóły.
                </Text>
              </Column>
            </Row>

            {/* Podsumowanie zamówienia */}
            <Section className="mt-6">
              <Heading as="h2" className="text-lg font-semibold">
                Podsumowanie zamówienia
              </Heading>
              {/* Lista produktów */}
              {items.map((item) => (
                <Row key={item.name}>
                  <Column>
                    <Text>
                      {item.name} (x{item.quantity})
                    </Text>
                  </Column>
                  <Column align="right">
                    <Text>{item.price.toFixed(2)} zł</Text>
                  </Column>
                </Row>
              ))}
              <Hr className="my-4 border-gray-300" />
              {/* Całkowity koszt */}
              <Row>
                <Column>
                  <Text className="font-bold text-base">Suma</Text>
                </Column>
                <Column align="right">
                  <Text className="font-bold text-base">
                    {total.toFixed(2)} zł
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* Szczegóły dostawy */}
            <Section className="mt-6">
              <Heading as="h2" className="text-lg font-semibold">
                Szczegóły dostawy
              </Heading>
              <Text>
                <strong>Adres dostawy:</strong>
                <br />
                {deliveryAddress}
              </Text>
              <Text>
                <strong>Szacowany czas dostawy:</strong>
                <br />
                {estimatedDeliveryTime}
              </Text>
            </Section>

            {/* Przycisk z wezwaniem do działania */}
            <Row>
              <Column align="center" className="pt-8">
                <Button
                  href={orderUrl}
                  target="_blank"
                  className="px-10 py-6 bg-red-700 text-white"
                >
                  Zobacz szczegóły zamówienia
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

          {/* Sekcja pomocy */}
          <Row>
            <Column>
              <Heading as="h4">Masz problem z zamówieniem?</Heading>
              <Text>
                Jeśli masz pytania dotyczące zamówienia, skontaktuj się z nami
                pod adresem{" "}
                <a href="mailto:kontakt@pizzahub.pl" className="text-red-700">
                  kontakt@pizzahub.pl
                </a>
                , podając numer zamówienia.
              </Text>
            </Column>
          </Row>
        </Section>
      </Tailwind>
    </Html>
  );
}

// ---- PRZYKŁAD UŻYCIA ----
// Tak mógłby wyglądać obiekt z danymi przekazywany do komponentu:
const exampleProps: OrderConfirmationEmailProps = {
  name: "Anna",
  orderId: "12345-ABCDE",
  orderDate: "15 października 2023, 18:35",
  items: [
    { name: "Pizza Margherita", quantity: 1, price: 32.0 },
    { name: "Pizza Pepperoni", quantity: 1, price: 38.5 },
    { name: "Sos czosnkowy", quantity: 2, price: 6.0 },
  ],
  total: 76.5,
  deliveryAddress: "ul. Kwiatowa 12/3, 00-001 Warszawa",
  estimatedDeliveryTime: "30-45 minut",
  orderUrl: "https://pizzahub.pl/moje-konto/zamowienia/12345-ABCDE",
};
