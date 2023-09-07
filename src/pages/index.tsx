import { ProductInput, ValidateOutput } from "@/types/productsInput";
import { validateProducts } from "@/services/productsApi";
import styles from '@/styles/home.module.scss';
import { parseCSV } from "@/utils/parseCSV";
import { useState } from "react";
import Head from "next/head";
import { RenderItems } from "@/components/Item";

export default function Home() {
  const [outputValidate, setOutputValidate] = useState<ValidateOutput[]>([]);
  const [data, setData] = useState<ProductInput[]>([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [disableButton, setDisabledButton] = useState(true);

  async function validateData() {
    const result = await validateProducts(data);
    setOutputValidate(result);
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      setSelectedFile(file.name);
      const result = await parseCSV(file);
      if (result) {
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
        
        <div className={styles.custom_products_container}>
          {outputValidate.length !== 0 && (
            <RenderItems outputValidate={outputValidate} />
          )}
        </div>
      </main>
    </>
  )
}
