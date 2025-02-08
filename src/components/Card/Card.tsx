import { FC, SyntheticEvent, useState } from 'react';
import styles from './Card.module.scss';
import defaultImage from '../../assets/default-image.jpg';

interface ICard {
    item: ISeminars;
    index: number;
    handleDelete: (index: number, item: ISeminars) => void;
    handleEditItem: (index: number, item: ISeminars) => void;
}

export const Card: FC<ICard> = ({item, index, handleDelete, handleEditItem}) => {
    const [imgError, setImgError] = useState<boolean>(false);

    const handleImageError = (error: SyntheticEvent<HTMLImageElement, Event>) => {
        return error ? setImgError(true) : setImgError(false);
    };

    return (
        <li className={styles.card}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>{item.date} - <span>{item.time}</span></p>

        <img 
            src={imgError ? defaultImage : item.photo}
            alt={item.title}
            onError={(e) => handleImageError(e)} />

            <div className={styles.card__buttons}>
                <button type="button" onClick={() => handleDelete(index, item)}>Удалить</button>
                <button type="button" onClick={() => handleEditItem(index, item)}>Редактировать</button>
            </div>
        </li>
    );
};