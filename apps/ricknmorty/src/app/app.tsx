import styles from  './app.module.css';
import {Main} from "./views/main";

function App() {

    return (
        <div className={styles.app}>
            <header className={styles.header}>
                <Main/>
            </header>
        </div>
    )
}

export default App
