import { Font } from "@react-email/components";
import React from "react";

interface IFont {
  style: React.CSSProperties["fontStyle"];
  weight: React.CSSProperties["fontWeight"];
  urls: string[];
}

const fonts: IFont[] = [
  {
    style: "italic",
    weight: 100,
    urls: [
      "https://fonts.gstatic.com/s/poppins/v23/pxiAyp8kv8JHgFVrJJLmE0tDMPKzSQ.woff2",
      "https://fonts.gstatic.com/s/poppins/v23/pxiAyp8kv8JHgFVrJJLmE0tMMPKzSQ.woff2",
      "https://fonts.gstatic.com/s/poppins/v23/pxiAyp8kv8JHgFVrJJLmE0tCMPI.woff2"
    ]
  },
  {
    style: "italic",
    weight: 200,
    urls: [
      "https://fonts.gstatic.com/s/poppins/v23/pxiDyp8kv8JHgFVrJJLmv1pVFteOcEg.woff2",
      "https://fonts.gstatic.com/s/poppins/v23/pxiDyp8kv8JHgFVrJJLmv1pVGdeOcEg.woff2",
      "https://fonts.gstatic.com/s/poppins/v23/pxiDyp8kv8JHgFVrJJLmv1pVF9eO.woff2"
    ]
  },
  {
    style: "italic",
    weight: 300,
    urls: [
      "https://fonts.gstatic.com/s/poppins/v23/pxiDyp8kv8JHgFVrJJLm21lVFteOcEg.woff2",
      "https://fonts.gstatic.com/s/poppins/v23/pxiDyp8kv8JHgFVrJJLm21lVGdeOcEg.woff2",
      "https://fonts.gstatic.com/s/poppins/v23/pxiDyp8kv8JHgFVrJJLm21lVF9eO.woff2"
    ]
  },
  {
    style: "italic",
    weight: 400,
    urls: [
      "https://fonts.gstatic.com/s/poppins/v23/pxiGyp8kv8JHgFVrJJLucXtAKPY.woff2",
      "https://fonts.gstatic.com/s/poppins/v23/pxiGyp8kv8JHgFVrJJLufntAKPY.woff2",
      "https://fonts.gstatic.com/s/poppins/v23/pxiGyp8kv8JHgFVrJJLucHtA.woff2"
    ]
  },
  {
    style: "italic",
    weight: 500,
    urls: [
      "https://fonts.gstatic.com/s/poppins/v23/pxiDyp8kv8JHgFVrJJLmg1hVFteOcEg.woff2",
      "https://fonts.gstatic.com/s/poppins/v23/pxiDyp8kv8JHgFVrJJLmg1hVGdeOcEg.woff2",
      "https://fonts.gstatic.com/s/poppins/v23/pxiDyp8kv8JHgFVrJJLmg1hVF9eO.woff2"
    ]
  },
  {
    style: "italic",
    weight: 600,
    urls: [
      "https://fonts.gstatic.com/s/poppins/v23/pxiDyp8kv8JHgFVrJJLmr19VFteOcEg.woff2",
      "https://fonts.gstatic.com/s/poppins/v23/pxiDyp8kv8JHgFVrJJLmr19VGdeOcEg.woff2",
      "https://fonts.gstatic.com/s/poppins/v23/pxiDyp8kv8JHgFVrJJLmr19VF9eO.woff2"
    ]
  },
  {
    style: "italic",
    weight: 700,
    urls: [
      "https://fonts.gstatic.com/s/poppins/v23/pxiDyp8kv8JHgFVrJJLmy15VFteOcEg.woff2",
      "https://fonts.gstatic.com/s/poppins/v23/pxiDyp8kv8JHgFVrJJLmy15VGdeOcEg.woff2",
      "https://fonts.gstatic.com/s/poppins/v23/pxiDyp8kv8JHgFVrJJLmy15VF9eO.woff2"
    ]
  },
  {
    style: "italic",
    weight: 800,
    urls: [
      "https://fonts.gstatic.com/s/poppins/v23/pxiDyp8kv8JHgFVrJJLm111VFteOcEg.woff2",
      "https://fonts.gstatic.com/s/poppins/v23/pxiDyp8kv8JHgFVrJJLm111VGdeOcEg.woff2",
      "https://fonts.gstatic.com/s/poppins/v23/pxiDyp8kv8JHgFVrJJLm111VF9eO.woff2"
    ]
  },
  {
    style: "italic",
    weight: 900,
    urls: [
      "https://fonts.gstatic.com/s/poppins/v23/pxiDyp8kv8JHgFVrJJLm81xVFteOcEg.woff2",
      "https://fonts.gstatic.com/s/poppins/v23/pxiDyp8kv8JHgFVrJJLm81xVGdeOcEg.woff2",
      "https://fonts.gstatic.com/s/poppins/v23/pxiDyp8kv8JHgFVrJJLm81xVF9eO.woff2"
    ]
  },
  {
    style: "normal",
    weight: 100,
    urls: [
      "https://fonts.gstatic.com/s/poppins/v23/pxiGyp8kv8JHgFVrLPTucXtAKPY.woff2",
      "https://fonts.gstatic.com/s/poppins/v23/pxiGyp8kv8JHgFVrLPTufntAKPY.woff2",
      "https://fonts.gstatic.com/s/poppins/v23/pxiGyp8kv8JHgFVrLPTucHtA.woff2"
    ]
  },
  {
    style: "normal",
    weight: 200,
    urls: [
      "https://fonts.gstatic.com/s/poppins/v23/pxiByp8kv8JHgFVrLFj_Z11lFc-K.woff2",
      "https://fonts.gstatic.com/s/poppins/v23/pxiByp8kv8JHgFVrLFj_Z1JlFc-K.woff2",
      "https://fonts.gstatic.com/s/poppins/v23/pxiByp8kv8JHgFVrLFj_Z1xlFQ.woff2"
    ]
  },
  {
    style: "normal",
    weight: 300,
    urls: [
      "https://fonts.gstatic.com/s/poppins/v23/pxiByp8kv8JHgFVrLDz8Z11lFc-K.woff2",
      "https://fonts.gstatic.com/s/poppins/v23/pxiByp8kv8JHgFVrLDz8Z1JlFc-K.woff2",
      "https://fonts.gstatic.com/s/poppins/v23/pxiByp8kv8JHgFVrLDz8Z1xlFQ.woff2"
    ]
  },
  {
    style: "normal",
    weight: 400,
    urls: [
      "https://fonts.gstatic.com/s/poppins/v23/pxiEyp8kv8JHgFVrJJbecmNE.woff2",
      "https://fonts.gstatic.com/s/poppins/v23/pxiEyp8kv8JHgFVrJJnecmNE.woff2",
      "https://fonts.gstatic.com/s/poppins/v23/pxiEyp8kv8JHgFVrJJfecg.woff2"
    ]
  },
  {
    style: "normal",
    weight: 500,
    urls: [
      "https://fonts.gstatic.com/s/poppins/v23/pxiByp8kv8JHgFVrLGT9Z11lFc-K.woff2",
      "https://fonts.gstatic.com/s/poppins/v23/pxiByp8kv8JHgFVrLGT9Z1JlFc-K.woff2",
      "https://fonts.gstatic.com/s/poppins/v23/pxiByp8kv8JHgFVrLGT9Z1xlFQ.woff2"
    ]
  },
  {
    style: "normal",
    weight: 600,
    urls: [
      "https://fonts.gstatic.com/s/poppins/v23/pxiByp8kv8JHgFVrLEj6Z11lFc-K.woff2",
      "https://fonts.gstatic.com/s/poppins/v23/pxiByp8kv8JHgFVrLEj6Z1JlFc-K.woff2",
      "https://fonts.gstatic.com/s/poppins/v23/pxiByp8kv8JHgFVrLEj6Z1xlFQ.woff2"
    ]
  },
  {
    style: "normal",
    weight: 700,
    urls: [
      "https://fonts.gstatic.com/s/poppins/v23/pxiByp8kv8JHgFVrLCz7Z11lFc-K.woff2",
      "https://fonts.gstatic.com/s/poppins/v23/pxiByp8kv8JHgFVrLCz7Z1JlFc-K.woff2",
      "https://fonts.gstatic.com/s/poppins/v23/pxiByp8kv8JHgFVrLCz7Z1xlFQ.woff2"
    ]
  },
  {
    style: "normal",
    weight: 800,
    urls: [
      "https://fonts.gstatic.com/s/poppins/v23/pxiByp8kv8JHgFVrLDD4Z11lFc-K.woff2",
      "https://fonts.gstatic.com/s/poppins/v23/pxiByp8kv8JHgFVrLDD4Z1JlFc-K.woff2",
      "https://fonts.gstatic.com/s/poppins/v23/pxiByp8kv8JHgFVrLDD4Z1xlFQ.woff2"
    ]
  },
  {
    style: "normal",
    weight: 900,
    urls: [
      "https://fonts.gstatic.com/s/poppins/v23/pxiByp8kv8JHgFVrLBT5Z11lFc-K.woff2",
      "https://fonts.gstatic.com/s/poppins/v23/pxiByp8kv8JHgFVrLBT5Z1JlFc-K.woff2",
      "https://fonts.gstatic.com/s/poppins/v23/pxiByp8kv8JHgFVrLBT5Z1xlFQ.woff2"
    ]
  }
];

export default function Fonts() {
  const family = "Poppins";
  const fallback = "serif";
  return (
    <>
      {fonts.map((v, i) =>
        v.urls.map((url, ui) => (
          <Font
            key={`${i}-${ui}`}
            fontFamily={family}
            fallbackFontFamily={fallback}
            webFont={{ url, format: "woff2" }}
            fontStyle={v.style}
            fontWeight={v.weight}
          />
        ))
      )}
      {/* <Font
        fontFamily="Poppins"
        fallbackFontFamily={fallback}
        webFont={{
          url: "https://fonts.gstatic.com/s/poppins/v23/pxiAyp8kv8JHgFVrJJLmE0tDMPKzSQ.woff2",
          format: "woff2"
        }}
        fontStyle="italic"
        fontWeight={100}
      />
      <Font
        fontFamily="Poppins"
        fallbackFontFamily={fallback}
        webFont={{
          url: "https://fonts.gstatic.com/s/poppins/v23/pxiAyp8kv8JHgFVrJJLmE0tMMPKzSQ.woff2",
          format: "woff2"
        }}
        fontStyle="italic"
        fontWeight={100}
      />
      <Font
        fontFamily="Poppins"
        fallbackFontFamily={fallback}
        webFont={{
          url: "https://fonts.gstatic.com/s/poppins/v23/pxiAyp8kv8JHgFVrJJLmE0tCMPI.woff2",
          format: "woff2"
        }}
        fontStyle="italic"
        fontWeight={100}
      /> */}
    </>
  );
}
