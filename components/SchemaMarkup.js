// components/SchemaMarkup.js
import React from 'react';

const SchemaMarkup = () => {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Trooper",
    "url": "https://trooper.so/",
    "description": "AI teammates that ship real work. They use your tools, run loops you approved, and come back when they need a sign-off."
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Trooper",
    "url": "https://trooper.so",
    "logo": "https://trooper.so/images/trooper-logomark.png",
    "description": "Trooper is the company layer on OpenClaw. AI teammates use the model plans you already pay for and wait for a sign-off before work ships.",
    "sameAs": [
      "https://twitter.com/trooper_so",
      "https://github.com/Trooper-AI/trooper-core"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "url": "https://trooper.so/contact-us"
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Trooper",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web, macOS",
    "description": "AI teammates for coding, support, sales, and ops. Built on OpenClaw. Bring the Claude, ChatGPT, Gemini, Cursor, or API plan you already pay for.",
    "url": "https://trooper.so",
    "featureList": [
      "AI teammates with a sign-off before work ships",
      "Company brain",
      "GitHub pull requests",
      "Browser control",
      "Email drafts",
      "OpenClaw skills and plugins",
      "Self-hosting"
    ],
    "offers": {
      "@type": "Offer",
      "price": "25.00",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "https://trooper.so/pricing",
      "description": "$25 per human a month. Model usage stays on your own account."
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
};

export default SchemaMarkup;
