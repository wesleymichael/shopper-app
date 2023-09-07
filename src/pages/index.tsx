import Head from "next/head";
import { useState } from "react";
import { toast } from "react-toastify";
import { BsTrash } from 'react-icons/bs';
import { parseCSV } from "@/utils/parseCSV";
import styles from '@/styles/home.module.scss';
import { RenderItems } from "@/components/Item";
import * as server from "@/services/productsApi";
import { ProductInput, ValidateOutput } from "@/types/productsInput";

export default function Home() {
  const [outputValidate, setOutputValidate] = useState<ValidateOutput[]>([]);
  const [data, setData] = useState<ProductInput[]>([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [disableButtonValidate, setDisabledButtonValidate] = useState(true);
  const [disableButtonUpdate, setDisabledButtonUpdate] = useState(true);

  async function validateData() {
    const result = await server.validateProducts(data) as ValidateOutput[];
    setOutputValidate(result);
    let hasError = false;

    for (const product of result) {
      if (product.error.length > 0) {
        hasError = true;
        break;
      }
    }
    setDisabledButtonUpdate(hasError);
  }

  async function updateData() {
    setDisabledButtonUpdate(true);
    setDisabledButtonValidate(true);
    const data = outputValidate.map((product) => ({
      code: product.code,
      variation: product.new_price / product.current_price,
    }));

    await server.updateProducts(data);
    toast('Dados atualizado com sucesso!');
    try {
    } catch (error) {
      toast('Erro ao atualizar os dados!');
      console.log(error);
    }
  }

  function clean() {
    setOutputValidate([]);
    setData([]);
    setDisabledButtonUpdate(true);
    setDisabledButtonValidate(true);
    setSelectedFile('');
  }
  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    clean();
    const fileInput = e.target;
    const file = fileInput.files && fileInput.files.length > 0 ? fileInput.files[0] : null;
  
    if (file) {
      setSelectedFile(file.name);
      fileInput.value = ''; // Limpar o valor do elemento de entrada de arquivo
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
            <div className={styles.container_file_name}>
              {selectedFile ? (
                <>
                  <p>{selectedFile}</p>
                  <BsTrash onClick={clean} />
                </>
              ) : (
                <p>Nenhum arquivo selecionado!</p>
              )}
            </div>
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
