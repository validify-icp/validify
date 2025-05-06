import React from "react";

export interface SignatureInfo {
  signature_name_1: string;
  signature_position_1: string;
  signature_name_2?: string;
  signature_position_2?: string;
}

export interface CertificateTemplateProps {
  data: {
    Nama: string;
    ID: string;
  };
  background: string;
  title: string;
  label: string;
  description: string;
  signatures: SignatureInfo;
  amountSignature?: number;
}

const CertificateTemplate = React.forwardRef<
  HTMLDivElement,
  CertificateTemplateProps
>(
  (
    {
      data,
      background,
      title,
      label,
      description,
      signatures,
      amountSignature = 1,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        style={{
          width: "604px",
          height: "423px",
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "2.25rem 2rem",
          fontFamily: "Abeezee, sans-serif",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            padding: "1.25rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.75rem",
            }}
          >
            <p>Sertifikat ID : {data.ID || "0000/XXXXXX"}</p>
          </div>

          <div
            style={{
              marginTop: "0.5rem",
              width: "100%",
              height: "280px",
              padding: "0.5rem 2rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                alignItems: "center",
              }}
            >
              <p
                style={{ fontSize: "1.5rem", fontFamily: "Inter, sans-serif" }}
              >
                {title || "Judul Sertifikat"}
              </p>
              <p style={{ fontSize: "0.75rem" }}>
                Sertifikat ini dengan bangga diberikan pada :
              </p>
              <p style={{ fontSize: "1.5rem" }}>
                {data.Nama || "Nama Peserta"}
              </p>
            </div>
            <hr
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#4256AC33",
                border: "none",
              }}
            />
            <p style={{ fontSize: "0.75rem" }}>Sebagai</p>
            <p style={{ fontSize: "0.875rem" }}>{label || "Label Kegiatan"}</p>
            <p
              style={{ fontSize: "0.875rem", fontFamily: "Inter, sans-serif" }}
            >
              {description ||
                "Sudah berhasil menyelesaikan semua materi kelas “Contoh Nama Kelas” dengan nilai Memuaskan"}
            </p>
          </div>

          <div
            style={{
              marginTop: "0.5rem",
              width: "100%",
              height: "70px",
              display: "flex",
              justifyContent: "space-around",
              gap: "0.5rem",
            }}
          >
            <div
              style={{
                width: "33%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.25rem",
              }}
            >
              <p style={{ fontSize: "0.75rem" }}>
                {signatures.signature_name_1 || "Nama Penyelenggara"}
              </p>
              <hr
                style={{
                  width: "100%",
                  height: "1px",
                  backgroundColor: "#E0E0E0",
                  border: "none",
                }}
              />
              <p
                style={{ fontSize: "0.75rem", fontFamily: "Inter, sans-serif" }}
              >
                {signatures.signature_position_1 || "Penyelenggara"}
              </p>
            </div>

            {amountSignature > 1 && (
              <div
                style={{
                  width: "33%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.25rem",
                }}
              >
                <p style={{ fontSize: "0.75rem" }}>
                  {signatures.signature_name_2 || "Nama Penyelenggara"}
                </p>
                <hr
                  style={{
                    width: "100%",
                    height: "1px",
                    backgroundColor: "#E0E0E0",
                    border: "none",
                  }}
                />
                <p
                  style={{
                    fontSize: "0.75rem",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {signatures.signature_position_2 || "Penyelenggara"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default CertificateTemplate;
