import { ValidateOutput } from '@/types/productsInput';
import styles from './styles.module.scss';

interface RenderItemsProps {
  outputValidate: ValidateOutput[];
}

export function RenderItems({outputValidate}: RenderItemsProps) {
  return (
    <>
      <table className={styles.custom_table}>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Preço Atual</th>
            <th>Novo Preço</th>
            <th>Erros</th>
          </tr>
        </thead>
        <tbody>
          {outputValidate.map((productValidate) => (
            <tr 
              key={productValidate.code}
              className={productValidate.error.length > 0 ? styles.error_row : ''}
            >
              <td>{productValidate.code}</td>
              <td>{productValidate.name}</td>
              <td>{productValidate.current_price}</td>
              <td>{productValidate.new_price}</td>
              <td>
                <ul>
                  {productValidate.error.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}