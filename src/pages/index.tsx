import { ProductInput } from "@/types/productsInput";
import { parseCSV } from "@/utils/parseCSV";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from '@/styles/home.module.scss';
import { validateProducts } from "@/services/productsApi";

export default function Home() {
  const [data, setData] = useState<ProductInput[]>([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [disableButton, setDisabledButton] = useState(true);

  async function validateData() {
    const result = await validateProducts(data);
    console.log(result);
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      setSelectedFile(file.name);
      const result = await parseCSV(file);
      if (result) {
        console.log(result)
        setData(result);
        setDisabledButton(false);
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
      <main>
        <div className={styles.custom_container}>
          <div>
            <label htmlFor="file-input" title="Clique aqui para escolher um arquivo CSV">
              Escolher Arquivo CSV
            </label>
            <input
              type="file"
              id="file-input"
              accept=".csv"
              onChange={handleFileUpload}
            />
            <h1>{selectedFile ? selectedFile : 'Nenhum arquivo selecionado!'}</h1>
          </div>
          <button disabled={disableButton} onClick={validateData}>
            Validar dados
          </button>
        </div>
      </main>
    </>
  )
}
