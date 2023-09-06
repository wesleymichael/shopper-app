import Link from 'next/link';
import styles from './styles.module.scss';
import Image from 'next/image';

export function Header() {
  
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContext}>
        <Link href='/'>
          <Image
              src='/images/logo.png'
              alt="Logo"
              width={200} 
              height={50}
            />
        </Link>
      </div>
    </header>
  )
}
