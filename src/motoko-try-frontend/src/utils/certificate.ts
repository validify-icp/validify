export const extractCertificateID = (text: string): string | null => {
  const match = text.match(/Sertifikat ID\s*:\s*([0-9/]+-)/);

  return match ? match[1] : null;
};
