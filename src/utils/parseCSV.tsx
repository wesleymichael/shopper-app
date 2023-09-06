import { ProductInput } from "@/types/productsInput";
import Papa from "papaparse";

export const parseCSV = (file: File): Promise<ProductInput[]> => {
  return new Promise<ProductInput[]>((resolve) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (result) => {
        if (result.data && result.data.length > 0) {
          const parsedData: ProductInput[] = result.data.map((row: any) => ({
            product_code: row.product_code,
            new_price: row.new_price,
          }));
          resolve(parsedData);
        } else {
          resolve([]);
        }
      },
      error: (error) => {
        console.error('Erro ao processar o arquivo CSV:', error.message);
        resolve([]);
      },
    });
  });
};
