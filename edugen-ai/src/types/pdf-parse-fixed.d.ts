declare module "pdf-parse-fixed" {
  interface PDFData {
    numpages: number
    numrender: number
    info: any
    metadata: any
    text: string
    version: string
  }

  function parsePDF(data: Buffer): Promise<PDFData>
  export = parsePDF
}
