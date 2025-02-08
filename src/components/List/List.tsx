import { FC } from 'react';
import { Card } from '../Card/Card';
import styles from './List.module.scss';

interface IList {
    seminars: ISeminars[];
    handleDelete: (index: number, item: ISeminars) => void;
    handleEditItem: (index: number, item: ISeminars) => void;
}

export const List: FC<IList> = ({seminars, handleDelete, handleEditItem}) => {
    return (
        <ul className={styles.list}>
            {
                seminars.length === 0 ? (
                    <li className={styles.list__empty}>
                        К сожалению, в данный момент нет запланированных семинаров.
                        Подпишитесь на наши обновления, чтобы первыми узнать о новых мероприятиях!
                    </li>
                ) : (
                    seminars.map((item, index) => (
                        <Card
                            key={index}
                            index={index}
                            item={item}
                            handleDelete={handleDelete}
                            handleEditItem={handleEditItem} />
                    ))
                )
            }
        </ul>
    );
};