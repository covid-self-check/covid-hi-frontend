import styles from "../styles/Home.module.css";
import RegistrationForm from "../components/RegistrationForm";

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <RegistrationForm />
      </div>
    </>
  );
}
