const requiredAddressFields = [
  "LEGAL_ADDRESS_STREET",
  "LEGAL_ADDRESS_POSTAL_CODE",
  "LEGAL_ADDRESS_CITY",
  "LEGAL_ADDRESS_COUNTRY",
] as const;

export type LegalContact = {
  street: string;
  postalCode: string;
  city: string;
  country: string;
};

export function legalPagesEnabled() {
  return process.env.LEGAL_PAGES_ENABLED === "true";
}

export function getLegalContact(): LegalContact | undefined {
  if (!legalPagesEnabled()) return undefined;

  const entries = requiredAddressFields.map(
    (field) => [field, process.env[field]?.trim()] as const,
  );
  const missing = entries.filter(([, value]) => !value).map(([field]) => field);

  if (missing.length > 0) {
    throw new Error(`LEGAL_PAGES_ENABLED=true requires: ${missing.join(", ")}`);
  }

  const values = Object.fromEntries(entries) as Record<
    (typeof requiredAddressFields)[number],
    string
  >;
  return {
    street: values.LEGAL_ADDRESS_STREET,
    postalCode: values.LEGAL_ADDRESS_POSTAL_CODE,
    city: values.LEGAL_ADDRESS_CITY,
    country: values.LEGAL_ADDRESS_COUNTRY,
  };
}
