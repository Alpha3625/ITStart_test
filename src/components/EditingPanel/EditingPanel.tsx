import { ChangeEvent, FC, useEffect, useState } from 'react';
import styles from './EditingPanel.module.scss';

interface IEditingPanel {
    handleUpdateFormData: (e: ChangeEvent<HTMLInputElement>) => void;
    currentEditedItem: ISeminars | null;
    handleUpdateItem: (updatedItem: ISeminars) => void;
    handleCancelUpdateItem: () => void;
}

export const EditingPanel: FC<IEditingPanel> = ({
    handleUpdateFormData,
    currentEditedItem,
    handleUpdateItem,
    handleCancelUpdateItem}) => {
        
    const formatDate = (dateString: string): string => {
        const [day, month, year] = dateString.split('.');
        return `${year}-${month}-${day}`;
    };

    const submitFormatDate = (dateString: string): string => {
        const [day, month, year] = dateString.split('-').reverse();
        return `${day}.${month}.${year}`;
    };

    const [formattedDate, setFormattedDate] = useState<string>('');

    useEffect(() => {
        if (currentEditedItem?.date) {
            setFormattedDate(formatDate(currentEditedItem.date));
        }
    }, [currentEditedItem]);

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (currentEditedItem) {
            const updatedItem = {
                ...currentEditedItem,
                date: submitFormatDate(formattedDate)
            };
            handleUpdateItem(updatedItem);
        }
    };
    
    return (
        <div className={styles["editing-panel"]}>
            <h2>Редактор</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={currentEditedItem?.title}
                    onChange={handleUpdateFormData}
                    placeholder="Заголовок" required/>
                    
                <input
                    type="text"
                    name="description"
                    value={currentEditedItem?.description}
                    onChange={handleUpdateFormData}
                    placeholder="Описание" required />

                <div className={styles["editing-panel__row"]}>
                    <input
                        type="date"
                        name="date"
                        value={formattedDate}
                        onChange={(e) => setFormattedDate(e.target.value)}
                        placeholder="Дата" required />

                    <input
                        type="time"
                        name="time"
                        value={currentEditedItem?.time}
                        onChange={handleUpdateFormData}
                        placeholder="Время" required />
                </div>

                <input
                    type="text"
                    name="photo"
                    value={currentEditedItem?.photo}
                    onChange={handleUpdateFormData}
                    placeholder="Ссылка на фото" required />

                <div className={styles["editing-panel__buttons"]}>
                    <button
                        type="submit"
                        onClick={() => handleUpdateItem}>Обновить</button>
                    <button
                        type="button"
                        onClick={handleCancelUpdateItem}>Отменить</button>
                </div>
            </form>
        </div>
    );
};