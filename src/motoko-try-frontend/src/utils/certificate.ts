import * as XLSX from "xlsx";

type Row = Record<string, any>;

export const extractCertificateID = (text: string): string | null => {
  const match = text.match(/Sertifikat ID\s*:\s*([0-9/]+)/);

  return match ? match[1] : null;
};

export const downloadExcelTemplate = async (
  url: string,
  filename = "template.xlsx"
) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Gagal mengunduh file.");
    }

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    link.click();

    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Download error:", error);
  }
};

export const parseExcelToJson = async (file: File): Promise<object[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json<Record<string, any>>(
          worksheet,
          { defval: "" }
        );

        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (err) => reject(err);

    reader.readAsArrayBuffer(file);
  });
};

export const hasEmptyFields = (data: Row[]): boolean => {
  return data.some((row) => {
    const id = row["ID"];
    const nama = row["Nama"];
    return (
      id === "" ||
      id === null ||
      id === undefined ||
      nama === "" ||
      nama === null ||
      nama === undefined
    );
  });
};
