import { ProductInput, ValidateOutput } from "@/types/productsInput";
import * as server from "@/services/productsApi";
import styles from '@/styles/home.module.scss';
import { parseCSV } from "@/utils/parseCSV";
import { useState } from "react";
import Head from "next/head";
import { RenderItems } from "@/components/Item";

export default function Home() {
  const [outputValidate, setOutputValidate] = useState<ValidateOutput[]>([]);
  const [data, setData] = useState<ProductInput[]>([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [disableButtonValidate, setDisabledButtonValidate] = useState(true);
  const [disableButtonUpdate, setDisabledButtonUpdate] = useState(true);

  async function validateData() {
    const result = await server.validateProducts(data) as ValidateOutput[];
    setOutputValidate(result);

    result.forEach((product) => {
      if(product.error.length > 0) {
        return;
      }
    });
    setDisabledButtonUpdate(false);
  }

  async function updateData() {
    const data = outputValidate.map((product) => ({
      code: product.code,
      variation: product.new_price / product.current_price,
    }));
    console.log(data);
    await server.updateProducts(data);
    alert('Atualizado com sucesso');
    try {
    } catch (error) {
      console.log(error);
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      setSelectedFile(file.name);
      const result = await parseCSV(file);
      if (result) {
        setData(result);
        setDisabledButtonValidate(false);
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
            <p>{selectedFile ? selectedFile : 'Nenhum arquivo selecionado!'}</p>
          </div>
          <button disabled={disableButtonValidate} onClick={validateData}>
            Validar dados
          </button>
        </div>
        
        <div className={styles.custom_products_container}>
          {outputValidate.length !== 0 && (
            <RenderItems outputValidate={outputValidate} />
          )}
        </div>

        <div className={styles.container_button_update}>
          <button className={styles.custon_button_update} onClick={updateData} disabled={disableButtonUpdate}>
            Atualizar dados
          </button>
        </div>
      </main>
    </>
  )
}
