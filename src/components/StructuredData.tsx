export default function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Immobilien Garten Service",
    description:
      "Servicii profesionale de amenajare grădini, tuns gazon, sisteme de irigații și întreținere spații verzi în Timișoara.",
    url: "https://immobilien-garten.ro",
    telephone: "+40747469681",
    email: "contact@immobilien-garten.ro",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Timișoara",
      addressCountry: "RO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.7489,
      longitude: 21.2087,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "07:00",
      closes: "19:00",
    },
    priceRange: "$$",
    image: "https://immobilien-garten.ro/logo1.png",
    sameAs: [
      "https://www.facebook.com/profile.php?id=61585939142249",
      "https://instagram.com/immobilien.garten",
    ],
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 45.7489,
        longitude: 21.2087,
      },
      geoRadius: "50000",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicii Grădinărit",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tuns Gazon" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Scarificare & Aerisire" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Toaletare Pomi & Arbuști" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tuns Gard Viu" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Plantări Profesionale" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Montaj Gazon Natural & Artificial" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sisteme de Irigații" } },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
