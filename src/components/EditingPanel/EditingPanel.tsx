import { ChangeEvent, FC, useEffect, useState } from 'react';
import styles from './EditingPanel.module.scss';

interface IEditingPanel {
    handleUpdateFormData: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
    currentEditedItem: ISeminars | null;
    handleUpdate: (updatedData: ISeminars) => void;
    handleCancelUpdate: () => void;
}

export const EditingPanel: FC<IEditingPanel> = ({
    handleUpdateFormData,
    currentEditedItem,
    handleUpdate,
    handleCancelUpdate}) => {
       
    // Форматирует дату из формата "дд.мм.гггг" в "гггг-мм-дд"
    const formatDate = (dateString: string): string => {
        const [day, month, year] = dateString.split('.');
        return `${year}-${month}-${day}`;
    };

    // Форматирует дату из формата "гггг-мм-дд" обратно в "дд.мм.гггг"
    const submitFormatDate = (dateString: string): string => {
        const [day, month, year] = dateString.split('-').reverse();
        return `${day}.${month}.${year}`;
    };

    // Состояние для хранения отформатированной даты
    const [formattedDate, setFormattedDate] = useState<string>('');

    // useEffect для установки отформатированной даты при изменении currentEditedItem
    useEffect(() => {
        if (currentEditedItem?.date) {
            setFormattedDate(formatDate(currentEditedItem.date));
        }
    }, [currentEditedItem?.date]);

    // Обработчик отправки формы
    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (currentEditedItem) {
            const updatedData = {
                ...currentEditedItem,
                date: submitFormatDate(formattedDate) // Обновляем дату в нужном формате
            };
            
            handleUpdate(updatedData); // Вызываем обработчик обновления с новыми данными
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
                    
                <textarea
                    name="description"
                    maxLength={300}
                    rows={4}
                    value={currentEditedItem?.description}
                    onChange={handleUpdateFormData}
                    placeholder="Описание" required />

                <div className={styles["editing-panel__row"]}>
                    <input
                        type="date"
                        name="date"
                        value={formattedDate}
                        onChange={(e) => setFormattedDate(e.target.value)} // Обновление состояния отформатированной даты
                        placeholder="Дата" required />

                    <input
                        type="time"
                        name="time"
                        value={currentEditedItem?.time}
                        onChange={handleUpdateFormData}
                        placeholder="Время" required />
                </div>

                <textarea
                    name="photo"
                    rows={4}
                    value={currentEditedItem?.photo}
                    onChange={handleUpdateFormData}
                    placeholder="Ссылка на фото" required />

                <div className={styles["editing-panel__buttons"]}>
                    <button
                        type="submit"
                        onClick={() => handleUpdate}>Обновить</button>
                    <button
                        type="button"
                        onClick={handleCancelUpdate}>Отменить</button>
                </div>
            </form>
        </div>
    );
};