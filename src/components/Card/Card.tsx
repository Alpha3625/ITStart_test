import { FC, useEffect, useState } from 'react';
import styles from './Card.module.scss';
import defaultImage from '../../assets/default-image.jpg';

interface ICard {
    item: ISeminars;
    handleDelete: (item: ISeminars) => void;
    handleEditItem: (item: ISeminars) => void;
}

export const Card: FC<ICard> = ({item, handleDelete, handleEditItem}) => {
    const [imgError, setImgError] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string>(item.photo);

    useEffect(() => {
        setImageUrl(item.photo);
        setImgError(false);
    }, [item.photo]);

    return (
        <li className={styles.card}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>{item.date} - <span>{item.time}</span></p>

        <img 
            src={imgError ? defaultImage : imageUrl}
            alt={item.title}
            onError={() => setImgError(true)} />

            <div className={styles.card__buttons}>
                <button type="button" onClick={() => handleDelete(item)}>Удалить</button>
                <button type="button" onClick={() => handleEditItem(item)}>Редактировать</button>
            </div>
        </li>
    );
};