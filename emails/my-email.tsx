import { Button, Html, Section, Row, Column, Img, Head, Text, Font } from "@react-email/components";

export default function Email(props: { name: string; url: string }) {
  return (
    <Html>
      <Head>
        <title>Zweryfikuj swój adres email</title>
        <Font
          fontFamily="Poppins"
          fallbackFontFamily="serif"
          webFont={{
            url: "https://fonts.gstatic.com/s/poppins/v23/pxiByp8kv8JHgFVrLCz7Z1xlFQ.woff2",
            format: "woff2"
          }}
        />
        <Font
          fontFamily="Poppins"
          fallbackFontFamily="serif"
          webFont={{
            url: "https://fonts.gstatic.com/s/poppins/v23/pxiByp8kv8JHgFVrLDD4Z1JlFc-K.woff2",
            format: "woff2"
          }}
        />
      </Head>
      <Section>
        <Row>
          <Column align="center">
            <Img height={100} src="http://localhost:3000/logo.svg" />
          </Column>
        </Row>
        <Row>
          <Column align="center">
            <Text>Cześć {props.name}, poniżej znajduje się przycisk do wyryfikacji twojego adresu email.</Text>
          </Column>
        </Row>
        <Row>
          <Column align="center">
            <Button
              href={props.url}
              target="_blank"
              style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
            >
              Zweryfikuj mnie
            </Button>
          </Column>
        </Row>
      </Section>
    </Html>
  );
}
