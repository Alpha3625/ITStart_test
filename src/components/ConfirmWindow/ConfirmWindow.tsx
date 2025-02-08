import { FC } from "react";
import styles from './ConfirmWindow.module.scss';

interface IConfirmWindow {
    handleConfirmDelete: () => void;
    handleCancelDelete: () => void;
}

export const ConfirmWindow: FC<IConfirmWindow> = ({handleConfirmDelete, handleCancelDelete}) => {
    return (
        <div className={styles["confirm-window"]}>
            <p>Вы уверены, что хотите удалить этот семинар?</p>
            <div className={styles["confirm-window__buttons"]}>
                <button type="button" onClick={handleConfirmDelete}>Да</button>
                <button type="button" onClick={handleCancelDelete}>Нет</button>
            </div>
        </div>
    );
};