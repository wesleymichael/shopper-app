import { ProductInput } from "@/types/productsInput";
import { parseCSV } from "@/utils/parseCSV";
import Head from "next/head";
import { useState } from "react";
import styles from '@/styles/home.module.scss';

export default function Home() {
  const [data, setData] = useState<ProductInput[]>([]);
  const [selectedFile, setSelectedFile] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      setSelectedFile(file.name);
      const result = await parseCSV(file);
      if (result) {
        console.log(result)
        setData(result);
      }
    } else {
      console.error('Nenhum arquivo selecionado.');
    }
  };
  
  return (
    <>
      <Head>
        <title>Shopper - Compras inteligentes. Vida Inteligente</title>
      </Head>
      <div className={styles.custom_container}>
        <label htmlFor="file-input">
          Escolher Arquivo CSV
        </label>
        <input
          type="file"
          id="file-input"
          accept=".csv"
          onChange={handleFileUpload}
        />
        <div>Arquivo selecionado:{selectedFile}</div>
        <button>
          Validar dados
        </button>
      </div>
    </>
  )
}
